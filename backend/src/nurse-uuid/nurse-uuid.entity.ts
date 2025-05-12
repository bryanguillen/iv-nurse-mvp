import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nurse_uuids')
export class NurseUuidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, name: 'supabase_id' })
  supabaseId: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
