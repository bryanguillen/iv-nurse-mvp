import { Entity, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('organization_uuid')
export class OrganizationUuidEntity {
  @PrimaryColumn({ unique: true, name: 'id', type: 'uuid' })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
