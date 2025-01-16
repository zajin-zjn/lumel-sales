import { Module } from '@nestjs/common';
import { CronTasksService } from './cron-tasks.service';
import { DataUploadService } from 'src/modules/data-upload/data-upload.service';
@Module({
  providers: [CronTasksService, DataUploadService],
})
export class CronTasksModule {}
