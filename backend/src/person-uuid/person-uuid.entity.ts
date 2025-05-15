import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { BookingEntity } from '../booking/booking.entity';

@Entity('person_uuid')
export class PersonUuidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'supabase_id' })
  supabaseId: string;

  @OneToMany(() => BookingEntity, (booking) => booking.person)
  bookings: BookingEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
