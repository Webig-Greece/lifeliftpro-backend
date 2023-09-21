import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.billings)
  user: User;

  @Column()
  stripeInvoiceId: string;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  amount: number;

  @Column()
  currency: string;

  @Column({ type: 'timestamp' })
  billingDate: Date;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
