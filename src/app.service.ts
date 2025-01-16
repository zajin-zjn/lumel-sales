import { Injectable } from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class AppService {
  apiStatus(): string {
    return `Api status running! - ${moment().format('YYYY/MM/DD hh:mm:ss A')}`;
  }
}
