import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NurseUuidEntity } from '../nurse-uuid/nurse-uuid.entity';
import { PersonUuidEntity } from '../person-uuid/person-uuid.entity';
import { NurseServiceEntity } from '../nurse-service/nurse-service.entity';

@Entity('booking')
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nurse_id' })
  nurseId: string;

  @ManyToOne(() => NurseUuidEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nurse_id' })
  nurse: NurseUuidEntity;

  @Column({ name: 'person_id' })
  personId: string;

  @ManyToOne(() => PersonUuidEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'person_id' })
  person: PersonUuidEntity;

  @Column({ name: 'service_id' })
  serviceId: string;

  @ManyToOne(() => NurseServiceEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: NurseServiceEntity;

  @Column({ name: 'start_time', type: 'timestamptz' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamptz' })
  endTime: Date;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes: string | null;

  // booked, cancelled, completed
  @Column({ default: 'booked' })
  status: string;

  @Column({ name: 'is_rebooking', default: false })
  isRebooking: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
