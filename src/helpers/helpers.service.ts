import { Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
@Injectable()
export class HelpersService {
  updateResult = async (result: UpdateResult): Promise<boolean> => (result.affected ? true : false);

  deleteResult = async (result: DeleteResult): Promise<boolean> => (result.affected ? true : false);
}
