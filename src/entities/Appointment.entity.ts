import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { PatientRecord } from './patientRecord.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => PatientRecord, (patientRecord) => patientRecord.appointments)
  @JoinColumn({ name: 'patient_id' })
  patient: PatientRecord;

  @Column({ name: 'scheduled_date', type: 'timestamp' })
  scheduledDate: Date;

  @Column()
  status: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  location: string;

  @Column({ name: 'appointment_type', nullable: true })
  appointmentType: string;

  @Column({ name: 'recurring_interval', nullable: true })
  recurringInterval: string;

  @Column({ name: 'recurring_end_date', type: 'date', nullable: true })
  recurringEndDate: Date;
}
