import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PatientRecord } from './PatientRecord.entity';
import { User } from './user.entity';

@Entity()
export class TherapySession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.therapySessions)
  therapist: User;

  @ManyToOne(
    () => PatientRecord,
    (patientRecord) => patientRecord.therapySessions,
  )
  patient: PatientRecord;

  @Column({ type: 'timestamp' })
  sessionDate: Date;

  @Column()
  duration: number; // in minutes

  @Column('text')
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
