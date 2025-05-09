import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nurses')
export class NurseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'org_name' })
  orgName: string;
}
