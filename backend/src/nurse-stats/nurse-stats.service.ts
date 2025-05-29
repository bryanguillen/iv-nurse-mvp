import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NurseStatsEntity } from './nurse-stats.entity';
import { CreateNurseStatsInput } from './dto/create-nurse-stats.input';
import { UpdateNurseStatsInput } from './dto/update-nurse-stats.input';
import { NurseUuidService } from '../nurse-uuid/nurse-uuid.service';

@Injectable()
export class NurseStatsService {
  constructor(
    @InjectRepository(NurseStatsEntity)
    private repo: Repository<NurseStatsEntity>,
    private nurseUuidService: NurseUuidService,
  ) {}

  async create(input: CreateNurseStatsInput): Promise<NurseStatsEntity> {
    // Verify nurse exists
    await this.nurseUuidService.getNurseById(input.nurseId);

    const record = this.repo.create(input);
    return this.repo.save(record);
  }

  async update(input: UpdateNurseStatsInput): Promise<NurseStatsEntity> {
    const stats = await this.repo.findOne({ where: { id: input.id } });
    if (!stats) {
      throw new NotFoundException(`Stats with ID ${input.id} not found`);
    }

    // Update only the fields that are provided
    const updatedStats = this.repo.merge(stats, {
      rebookingsCount: input.rebookingsCount ?? stats.rebookingsCount,
      newCustomersCount: input.newCustomersCount ?? stats.newCustomersCount,
      rebookingsRevenue: input.rebookingsRevenue ?? stats.rebookingsRevenue,
      newCustomersRevenue:
        input.newCustomersRevenue ?? stats.newCustomersRevenue,
      totalRevenue: input.totalRevenue ?? stats.totalRevenue,
    });

    return this.repo.save(updatedStats);
  }

  async getByNurseId(nurseId: string): Promise<NurseStatsEntity[]> {
    return this.repo.find({
      where: { nurseId },
      order: { createdAt: 'DESC' },
    });
  }
}
