import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('organization_uuid')
export class OrganizationUuidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, name: 'supabase_org_id' })
  supabaseOrgId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
