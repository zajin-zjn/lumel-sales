import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import path from 'path';
import { DataUploadService } from 'src/modules/data-upload/data-upload.service';
import Queue from 'promise-queue';
Queue.configure(Promise);
const maxPendingPromises = 1;
const maxQueuedPromises = Infinity;
const queue = new Queue(maxPendingPromises, maxQueuedPromises);

@Injectable()
export class CronTasksService {
  constructor(private readonly dataUploadService: DataUploadService) {}

  // runs daily at midnight
  @Cron('0 0 * * *', { name: 'data refresh' })
  async csvDataRefresh() {
    try {
      console.log('Refreshing data...');
      const filePath = path.join(`${__dirname}/../../src/assets/sales.csv`);
      // adding this into queue to avoid affecting the main application
      return queue
        .add(async () => {
          await this.dataUploadService.loadCsvData(filePath);
          console.log('Data refreshed successfully!');
        })
        .catch((error: any) => {
          throw error;
        });
    } catch (error) {
      console.error('Data refresh failed:', error);
      // we can write logs or notify user through an email for the success and failures
    }
  }
}
