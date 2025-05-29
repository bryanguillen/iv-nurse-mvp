import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NurseUuidEntity } from '../nurse-uuid/nurse-uuid.entity';

@Entity('nurse_stats')
export class NurseStatsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nurse_id' })
  nurseId: string;

  @ManyToOne(() => NurseUuidEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nurse_id' })
  nurse: NurseUuidEntity;

  @Column({ name: 'rebookings_count', type: 'int', default: 0 })
  rebookingsCount: number;

  @Column({ name: 'new_customers_count', type: 'int', default: 0 })
  newCustomersCount: number;

  @Column({ name: 'rebookings_revenue', type: 'numeric', default: 0 })
  rebookingsRevenue: number;

  @Column({ name: 'new_customers_revenue', type: 'numeric', default: 0 })
  newCustomersRevenue: number;

  @Column({ name: 'total_revenue', type: 'numeric', default: 0 })
  totalRevenue: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
