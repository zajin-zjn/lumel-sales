import { Controller, Get, Query } from '@nestjs/common';
import { DataAnalyticsService } from './data-analytics.service';
import { RevenueQueryParams } from 'src/interfaces/analytics.interface';

@Controller('data-analytics')
export class DataAnalyticsController {
  constructor(private readonly analyticsService: DataAnalyticsService) {}

  @Get('revenue')
  async getRevenue(@Query() query: RevenueQueryParams) {
    return this.analyticsService.getRevenue(query);
  }
}
