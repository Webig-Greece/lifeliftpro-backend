import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Branch } from './branch.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  vat_number: string;

  @Column({ type: 'date', nullable: true })
  vat_verification_date: Date;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  billing_address: string;

  @Column({ nullable: true })
  stripe_subscription_id: string;

  @Column({ type: 'timestamp', nullable: true })
  subscription_expiry: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Branch, (branch) => branch.company)
  branches: Branch[];
}
