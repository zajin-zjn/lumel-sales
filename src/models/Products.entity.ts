import { Entity, Column, Index, OneToMany } from 'typeorm';
import { BaseModel } from './abstract/BaseModel';
import { OrderItems } from './OrderItems.entity';

@Entity('products')
export class Products extends BaseModel {
  @Column({ unique: true })
  productId!: string;

  @Index()
  @Column()
  productName!: string;

  @Index()
  @Column()
  category!: string;

  //   @Column({
  //     type: 'decimal',
  //     precision: 13,
  //     scale: 2,
  //     default: 0,
  //   })
  //   unitPrice!: number;

  // Relations to join tables
  @OneToMany(() => OrderItems, (e) => e.product, {
    nullable: true,
  })
  orderedItem!: Array<OrderItems>;
}
