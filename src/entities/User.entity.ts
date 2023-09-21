import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Company } from './company.entity';
import { Branch } from './Branch.entity';
import { PatientRecord } from './PatientRecord.entity';
import { Appointment } from './Appointment.entity';
import { Treatment } from './Treatment.entity';
import { Billing } from './Billing.entity';
import { AuditLog } from './AuditLog.entity';
import { Notification } from './Notification.entity';
import { Feedback } from './Feedback.entity';
import { TherapySession } from './TherapySession.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'timestamp', nullable: true })
  trialEndsAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt: Date;

  @Column()
  password: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ unique: true, nullable: true })
  vatNumber: string;

  @Column({ type: 'boolean', nullable: true })
  isFreelancer: boolean;

  @Column({ default: false })
  subscribedFromTrial: boolean;

  @Column({
    type: 'enum',
    enum: ['psychologist', 'counselor', 'coach', 'psychiatrist'],
    nullable: true,
  })
  profession: string;

  @Column({
    type: 'enum',
    enum: ['main', 'secretary', 'professional'],
    default: 'main',
  })
  accountType: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  language: string;

  @Column({ type: 'enum', enum: ['BIRP', 'DAP'], default: 'BIRP' })
  defaultTemplate: string;

  @Column({ default: 'active' })
  status: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  rememberToken: string;

  @Column({ nullable: true })
  stripeCustomerId: string;

  @Column({ nullable: true })
  stripeSubscriptionId: string;

  @Column({ default: 'inactive' })
  subscriptionStatus: 'active' | 'past_due' | 'canceled' | 'inactive';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Foreign keys
  @ManyToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => PatientRecord, (patientRecord) => patientRecord.user)
  patientRecords: PatientRecord[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @OneToMany(() => Treatment, (treatment) => treatment.user)
  treatments: Treatment[];

  @OneToMany(() => Billing, (billing) => billing.user)
  billings: Billing[];

  @OneToMany(() => AuditLog, (auditLog) => auditLog.user)
  auditLogs: AuditLog[];

  @OneToMany(() => Notification, (notification) => notification.recipient)
  notifications: Notification[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  @OneToMany(() => TherapySession, (therapySession) => therapySession.therapist)
  therapySessions: TherapySession[];
}
