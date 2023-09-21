import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Branch } from './branch.entity';
import { Appointment } from './Appointment.entity';
import { Treatment } from './Treatment.entity';
import { Attachment } from './Attachment.entity';
import { TherapySession } from './TherapySession.entity';

@Entity('patient_records')
export class PatientRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Branch, (branch) => branch.patientRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @ManyToOne(() => User, (user) => user.patientRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'patient_first_name' })
  patientFirstName: string;

  @Column({ name: 'patient_last_name' })
  patientLastName: string;

  @Column({ type: 'date', name: 'date_of_birth', nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  medicalHistory: string;

  @Column({ type: 'text', nullable: true })
  treatmentPlan: string;

  @Column({ type: 'timestamp', name: 'next_appointment', nullable: true })
  nextAppointment: Date;

  @Column({ name: 'emergency_contact', nullable: true })
  emergencyContact: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ name: 'insurance_information', nullable: true })
  insuranceInformation: string;

  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => Treatment, (treatment) => treatment.patient)
  treatments: Treatment[];

  @OneToMany(() => Attachment, (attachment) => attachment.patient)
  attachments: Attachment[];

  @OneToMany(() => TherapySession, (therapySession) => therapySession.patient)
  therapySessions: TherapySession[];
}
