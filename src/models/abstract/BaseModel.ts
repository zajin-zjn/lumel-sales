/* eslint-disable max-classes-per-file */
import { PrimaryGeneratedColumn } from 'typeorm';

import { DefaultModel, ParanoidDefaultModel } from './DefaultModel';

export abstract class BaseModel extends DefaultModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
}

export abstract class ParanoidBaseModel extends ParanoidDefaultModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
}
