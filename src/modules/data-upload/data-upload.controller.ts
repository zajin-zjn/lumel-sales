import { Controller, Post } from '@nestjs/common';
import { DataUploadService } from './data-upload.service';
import path from 'path';

@Controller('data-upload')
export class DataUploadController {
  constructor(private readonly datauploadService: DataUploadService) {}

  @Post() // we can use @FileInterceptor, if we need to use this api as an file upload api.
  async loadCsvData() {
    const filePath = path.join(`${__dirname}/../../../src/assets/sales.csv`);

    return await this.datauploadService.loadCsvData(filePath);
  }
}
