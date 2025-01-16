import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RevenueQueryParams } from 'src/interfaces/analytics.interface';
import { Orders } from 'src/models/Orders.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DataAnalyticsService {
  constructor(private readonly dataSource: DataSource) {}

  getRevenue = async (params: RevenueQueryParams): Promise<any> => {
    try {
      const { startDate, endDate, type } = params;

      if (!startDate || !endDate) {
        throw new BadRequestException('Both startDate and endDate are required.');
      }

      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);

      if (
        !parsedStartDate ||
        !parsedEndDate ||
        isNaN(parsedStartDate.getDay()) ||
        isNaN(parsedEndDate.getDay())
      ) {
        throw new BadRequestException('Invalid date format for startDate or endDate.');
      }

      if (!['product', 'category', 'region'].includes(type)) {
        throw new BadRequestException(`Invalid type`);
      }

      const qb = this.dataSource
        .createQueryBuilder()
        .from(Orders, 'order')
        .leftJoinAndSelect('order.orderedItem', 'orderItems')
        .leftJoinAndSelect('orderItems.product', 'product')
        .select([
          'ROUND(SUM("orderItems".quantity * "orderItems"."unitPrice") - SUM("orderItems".quantity * "orderItems"."unitPrice" * "orderItems".discount),2) AS "totalRevenue"',
        ])
        .where('order.id IS NOT NULL')
        .andWhere(`"order"."dateOfSale" >= :startDate`, { startDate })
        .andWhere(`"order"."dateOfSale" <= :endDate`, { endDate });

      if (type === 'product') {
        qb.addSelect('product.productName', 'productName');
        qb.groupBy('product.productName');
      } else if (type === 'category') {
        qb.addSelect('product.category', 'category');
        qb.groupBy('product.category');
      } else if (type === 'region') {
        qb.addSelect('order.region', 'region');
        qb.groupBy('order.region');
      }

      const result = await qb.getRawMany();
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error instanceof Error ? error.message : `something went wrong`,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  };
}
