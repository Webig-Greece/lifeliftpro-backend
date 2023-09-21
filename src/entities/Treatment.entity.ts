import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { PatientRecord } from './patientRecord.entity';

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PatientRecord, (patientRecord) => patientRecord.treatments)
  @JoinColumn({ name: 'patient_id' })
  patient: PatientRecord;

  @ManyToOne(() => User, (user) => user.treatments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'template_type' })
  templateType: string;

  @Column({ name: 'behavior_or_data', type: 'text', nullable: true })
  behaviorOrData: string;

  @Column({ name: 'intervention_or_assessment', type: 'text', nullable: true })
  interventionOrAssessment: string;

  @Column({ name: 'response', type: 'text', nullable: true })
  response: string;

  @Column({ name: 'plan', type: 'text' })
  plan: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @Column({ default: 'active' })
  status: string;
}
