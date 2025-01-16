import { Module } from '@nestjs/common';
import { DataUploadModule } from './data-upload/data-upload.module';
import { DataAnalyticsModule } from './data-analytics/data-analytics.module';

@Module({
  imports: [DataUploadModule, DataAnalyticsModule],
})
export class ModulesModule {}
