import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { NurseUuidEntity } from '../nurse-uuid/nurse-uuid.entity';
import { BookingEntity } from '../booking/booking.entity';

@Entity('nurse_service')
export class NurseServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nurse_id' })
  nurseId: string;

  @ManyToOne(() => NurseUuidEntity, (nurse) => nurse.services)
  @JoinColumn({ name: 'nurse_id' })
  nurse: NurseUuidEntity;

  @OneToMany(() => BookingEntity, (booking) => booking.service)
  bookings: BookingEntity[];

  @Column()
  name: string;

  @Column({ type: 'int', name: 'duration_minutes' })
  durationMinutes: number;

  @Column({ type: 'numeric', nullable: true })
  price: number | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'boolean', default: false, name: 'top_pick' })
  topPick: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
