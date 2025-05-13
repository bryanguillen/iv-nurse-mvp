import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { NurseUuidEntity } from '../nurse-uuid/nurse-uuid.entity';

@Entity('nurse_service')
export class NurseServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nurse_id' })
  nurseId: string;

  @ManyToOne(() => NurseUuidEntity, (nurse) => nurse.services)
  @JoinColumn({ name: 'nurse_id' })
  nurse: NurseUuidEntity;

  @Column()
  name: string;

  @Column({ type: 'int', name: 'duration_minutes' })
  durationMinutes: number;

  @Column({ type: 'numeric', nullable: true })
  price: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
