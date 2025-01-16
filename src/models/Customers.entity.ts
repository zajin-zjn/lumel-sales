import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './abstract/BaseModel';
import { Orders } from './Orders.entity';

@Entity('customers')
export class Customers extends BaseModel {
  @Column()
  customerId!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column('text')
  address!: string;

  // Relations

  @OneToMany(() => Orders, (e) => e.customer, {
    nullable: true,
  })
  orders!: Array<Orders>;
}
