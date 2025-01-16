import { Module } from '@nestjs/common';
import { DataUploadService } from './data-upload.service';
import { DataUploadController } from './data-upload.controller';

@Module({
  providers: [DataUploadService],
  controllers: [DataUploadController],
})
export class DataUploadModule {}
