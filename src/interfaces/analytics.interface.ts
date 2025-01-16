interface dateParams {
  startDate: Date;
  endDate: Date;
}

export interface RevenueQueryParams extends dateParams {
  type: 'product' | 'category' | 'region';
}
