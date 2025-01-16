import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { DataSource } from 'typeorm';
import { Orders } from 'src/models/Orders.entity';
import { Products } from 'src/models/Products.entity';
import { Customers } from 'src/models/Customers.entity';
import { OrderItems } from 'src/models/OrderItems.entity';
import { finished } from 'stream/promises';
import moment from 'moment';

const BATCH_SIZE = 500;

@Injectable()
export class DataUploadService {
  private readonly logger = new Logger(DataUploadService.name);

  constructor(private readonly dataSource: DataSource) {}

  // we can use class validators in dto validate the data. but for now am using this.
  validateCsvData = async (data: Record<string, any>): Promise<string[]> => {
    const errors: string[] = [];

    // Mandatory fields validation
    if (!data['Order ID'] || !data['Product ID'] || !data['Customer ID']) {
      errors.push('Order ID, Product ID, and Customer ID are mandatory.');
    }

    // Product Name validation
    if (!data['Product Name']) {
      errors.push('Product Name is required.');
    }

    // Category validation
    if (!data['Category']) {
      errors.push('Category is required.');
    }

    // Region validation
    if (!data['Region']) {
      errors.push('Region is required.');
    }

    // Date of Sale validation
    if (!data['Date of Sale'] || isNaN(Date.parse(data['Date of Sale']))) {
      errors.push('Date of Sale is invalid or missing.');
    }

    // Quantity Sold validation
    if (!data['Quantity Sold'] || isNaN(parseInt(data['Quantity Sold'], 10))) {
      errors.push('Quantity Sold must be a valid integer.');
    } else if (parseInt(data['Quantity Sold'], 10) <= 0) {
      errors.push('Quantity Sold must be greater than zero.');
    }

    // Unit Price validation
    if (!data['Unit Price'] || isNaN(parseFloat(data['Unit Price']))) {
      errors.push('Unit Price must be a valid number.');
    } else if (parseFloat(data['Unit Price']) <= 0) {
      errors.push('Unit Price must be greater than zero.');
    }

    // Discount validation
    if (!data['Discount'] || isNaN(parseFloat(data['Discount']))) {
      errors.push('Discount must be a valid number.');
    } else if (parseFloat(data['Discount']) < 0 || parseFloat(data['Discount']) > 1) {
      errors.push('Discount must be between 0 and 1 (inclusive).');
    }

    // Shipping Cost validation
    if (!data['Shipping Cost'] || isNaN(parseFloat(data['Shipping Cost']))) {
      errors.push('Shipping Cost must be a valid number.');
    } else if (parseFloat(data['Shipping Cost']) < 0) {
      errors.push('Shipping Cost must be greater than or equal to zero.');
    }

    // Payment Method validation
    const validPaymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'COD'];
    if (!data['Payment Method'] || !validPaymentMethods.includes(data['Payment Method'])) {
      errors.push(`Payment Method is invalid.`);
    }

    // Customer Name validation
    if (!data['Customer Name']) {
      errors.push('Customer Name is required.');
    }

    // Customer Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data['Customer Email'] || !emailRegex.test(data['Customer Email'])) {
      errors.push('Customer Email is invalid.');
    }

    // Customer Address validation
    if (!data['Customer Address']) {
      errors.push('Customer Address is required.');
    }

    return errors;
  };

  loadCsvData = async (filePath: string): Promise<any> => {
    // we can use queues if we want this to be run in backgroud process.
    try {
      const errors: { rowId: number; row: any; error: string[] }[] = [];
      const batch: any[] = [];
      let rowCount = 0;

      const stream = createReadStream(filePath).pipe(csv()); // this will load overall data

      // this method will read the data one by one like for loop
      stream.on('data', async (data) => {
        try {
          // Validate the data
          const findErrors = await this.validateCsvData(data);
          if (findErrors.length) {
            errors.push({
              rowId: rowCount,
              row: data,
              error: findErrors,
            });
          } else {
            batch.push(data);
            rowCount++;
            // while processing the data to store in database if want we can pause and resume since we are using steams to load bulk data
            if (batch.length >= BATCH_SIZE) {
              this.processTheCsvData(batch).catch((err) => {
                this.logger.error(`Batch processing error: ${err.message}`);
              });
              batch.length = 0; // I am using this method to empty the array because I used const to define the array.
            }
          }
        } catch (error) {
          throw error;
        }
      });

      stream.on('error', (err) => {
        this.logger.error(`CSV parsing error: ${err.message}`);
        throw err;
      });

      // This helps to  wait the stream to complete
      await finished(stream);

      // add the remaining data in the database
      if (batch.length > 0) {
        await this.processTheCsvData(batch);
      }

      return { result: `${rowCount} data has been loaded`, errors };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error instanceof Error ? error.message : `something went wrong!`,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  };

  private async processTheCsvData(batch: any[]): Promise<void> {
    try {
      await this.storeTheCsvData(batch);
      this.logger.log(`loaded ${batch.length} rows.`);
    } catch (err: any) {
      this.logger.error(`Data insertion failed: ${err.message}`);
    }
  }

  storeTheCsvData = async (results: any[]): Promise<any> => {
    // we can use transaction for this and we can even split this function into small parts for more readable
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    queryRunner.startTransaction();

    try {
      for (const record of results) {
        // check if the customer data already exist
        let findCustomer = await queryRunner.manager.findOneBy(Customers, {
          customerId: record['Customer ID'],
        });

        const customerData = queryRunner.manager.create(Customers, {
          customerId: record['Customer ID'],
          name: record['Customer Name'],
          email: record['Customer Email'],
          address: record['Customer Address'],
          ...(findCustomer ? { id: findCustomer.id } : {}), // this will upsert the data
        });
        findCustomer = await queryRunner.manager.save(customerData);

        // check if the product data already exist
        let findProduct = await queryRunner.manager.findOneBy(Products, {
          productId: record['Product ID'],
        });

        const product = queryRunner.manager.create(Products, {
          productId: record['Product ID'],
          productName: record['Product Name'],
          category: record['Category'],
          ...(findProduct ? { id: findProduct.id } : {}), // this will upsert the data
        });

        findProduct = await queryRunner.manager.save(product);

        // check if the order data already exist
        let findOrder = await queryRunner.manager.findOneBy(Orders, {
          orderId: record['Order ID'],
          customerId: findCustomer.id,
        });

        const order = queryRunner.manager.create(Orders, {
          customerId: findCustomer.id,
          orderId: record['Order ID'],
          region: record['Region'],
          dateOfSale: moment(new Date(record['Date of Sale'])).format('YYYY-MM-DD'),
          paymentMethod: record['Payment Method'],
          ...(findOrder ? { id: findOrder.id } : {}), // this will upsert the data
        });

        findOrder = await queryRunner.manager.save(order);

        if (findOrder) {
          // check if the order data already exist
          const findOrderItems = await queryRunner.manager.findOneBy(OrderItems, {
            orderId: findOrder.id,
            productId: findProduct.id,
          });

          await queryRunner.manager.save(OrderItems, {
            ...(findOrderItems ? { id: findOrderItems.id } : {}), // this will upsert the data
            orderId: findOrder.id,
            productId: findProduct.id,
            quantity: parseInt(record['Quantity Sold'], 10),
            unitPrice: parseFloat(record['Unit Price']),
            discount: parseFloat(record['Discount']),
            shippingCost: parseFloat(record['Shipping Cost']),
          });
        }
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };
}
