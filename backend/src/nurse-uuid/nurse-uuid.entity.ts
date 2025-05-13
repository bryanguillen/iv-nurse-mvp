import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { NurseAvailabilityEntity } from '../nurse-availability/nurse-availability.entity';
import { NurseServiceEntity } from '../nurse-service/nurse-service.entity';
@Entity('nurse_uuids')
export class NurseUuidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, name: 'supabase_id' })
  supabaseId: string;

  @OneToMany(
    () => NurseAvailabilityEntity,
    (availability) => availability.nurse,
  )
  availability: NurseAvailabilityEntity[];

  @OneToMany(() => NurseServiceEntity, (service) => service.nurse)
  services: NurseServiceEntity[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
