import { Module } from '@nestjs/common';
import { DataAnalyticsService } from './data-analytics.service';
import { DataAnalyticsController } from './data-analytics.controller';

@Module({
  providers: [DataAnalyticsService],
  controllers: [DataAnalyticsController],
})
export class DataAnalyticsModule {}
