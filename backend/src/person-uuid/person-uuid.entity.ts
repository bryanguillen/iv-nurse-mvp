import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity('person_uuid')
export class PersonUuidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'supabase_id' })
  supabaseId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
