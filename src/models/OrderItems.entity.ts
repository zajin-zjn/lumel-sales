import { Entity, Column, JoinColumn, ManyToOne, Index } from 'typeorm';
import { BaseModel } from './abstract/BaseModel';
import { Products } from './Products.entity';
import { Orders } from './Orders.entity';

@Entity('orderItems')
export class OrderItems extends BaseModel {
  @Index()
  @Column('uuid')
  orderId!: string;

  @Index()
  @Column('uuid')
  productId!: string;

  @Column()
  quantity!: number;

  @Column({
    type: 'decimal',
    precision: 13,
    scale: 2,
    default: 0,
  })
  unitPrice!: number;

  @Column({
    type: 'decimal',
    precision: 13,
    scale: 2,
    default: 0,
  })
  discount!: number;

  @Column({
    type: 'decimal',
    precision: 13,
    scale: 2,
    default: 0,
  })
  shippingCost!: number;

  // Relations
  @ManyToOne(() => Products, (e) => e.orderedItem, {
    nullable: true,
  })
  @JoinColumn({ name: 'productId' })
  product!: Products;

  @ManyToOne(() => Orders, (e) => e.orderedItem, {
    nullable: true,
  })
  @JoinColumn({ name: 'orderId' })
  order!: Orders;
}
