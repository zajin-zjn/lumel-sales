import { Entity, Column, JoinColumn, ManyToOne, Index, OneToMany } from 'typeorm';
import { ParanoidBaseModel } from './abstract/BaseModel';
import { Customers } from './Customers.entity';
import { OrderItems } from './OrderItems.entity';

@Entity('orders')
export class Orders extends ParanoidBaseModel {
  @Index()
  @Column('uuid')
  customerId!: string;

  @Column()
  orderId!: number;

  @Column()
  region!: string;

  @Index()
  @Column({ type: 'date' })
  dateOfSale!: Date;

  @Column()
  paymentMethod!: string;

  // Relations
  @ManyToOne(() => Customers, (e) => e.orders, {
    nullable: true,
  })
  @JoinColumn({ name: 'customerId' })
  customer!: Customers;

  @OneToMany(() => OrderItems, (e) => e.order, {
    nullable: true,
  })
  orderedItem!: Array<OrderItems>;
}
