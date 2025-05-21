import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NurseAvailabilityEntity } from '../nurse-availability/nurse-availability.entity';
import { NurseServiceEntity } from '../nurse-service/nurse-service.entity';
import { BookingEntity } from '../booking/booking.entity';
import { OrganizationUuidEntity } from '../organization-uuid/organization-uuid.entity';

@Entity('nurse_uuids')
export class NurseUuidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, name: 'supabase_id' })
  supabaseId: string;

  @Column({ name: 'timezone', type: 'text', default: 'America/New_York' })
  timezone: string;

  @Column({ name: 'organization_id' })
  organizationId: string;

  @ManyToOne(() => OrganizationUuidEntity)
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationUuidEntity;

  @OneToMany(
    () => NurseAvailabilityEntity,
    (availability) => availability.nurse,
  )
  availability: NurseAvailabilityEntity[];

  @OneToMany(() => NurseServiceEntity, (service) => service.nurse)
  services: NurseServiceEntity[];

  @OneToMany(() => BookingEntity, (booking) => booking.nurse)
  bookings: BookingEntity[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
