/* eslint-disable max-classes-per-file */
import { Column, CreateDateColumn, Index, UpdateDateColumn, VersionColumn } from 'typeorm';

export abstract class DefaultModel {
  @Index()
  @Column({ nullable: true, default: null, type: 'uuid' })
  createdBy!: string;

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Index()
  @Column({ nullable: true, default: null, type: 'uuid' })
  updatedBy!: string;

  @Index()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @VersionColumn({ default: 1 })
  updateCount!: number;
}

export abstract class ParanoidDefaultModel extends DefaultModel {
  @Index()
  @Column({ default: null, nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @Index()
  @Column({ nullable: true, default: null, type: 'uuid' })
  deletedBy!: string;
}
