import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nurse')
export class NurseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  org_name: string;
}
