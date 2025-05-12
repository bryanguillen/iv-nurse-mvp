import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NurseUuidEntity } from '../nurse-uuid/nurse-uuid.entity';

@Entity('nurse_availability')
export class NurseAvailabilityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nurse_id' })
  nurseId: string;

  @ManyToOne(() => NurseUuidEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nurse_id' })
  nurse: NurseUuidEntity;

  @Column({ name: 'day_of_week' })
  dayOfWeek: string;

  @Column({ name: 'start_time', type: 'time' })
  startTime: string;

  @Column({ name: 'end_time', type: 'time' })
  endTime: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
