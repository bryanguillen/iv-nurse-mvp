import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NurseServiceEntity } from './nurse-service.entity';
import { CreateNurseServicesInput } from './dto/create-nurse-services.input';

@Injectable()
export class NurseServiceService {
  constructor(
    @InjectRepository(NurseServiceEntity)
    private repo: Repository<NurseServiceEntity>,
  ) {}

  async createMany(
    input: CreateNurseServicesInput,
  ): Promise<NurseServiceEntity[]> {
    const { nurseId, services } = input;
    const records = services.map((service) =>
      this.repo.create({ nurseId, ...service }),
    );
    return this.repo.save(records);
  }

  async deleteByIds(ids: string[]): Promise<number> {
    const result = await this.repo.delete(ids);
    return result.affected ?? 0;
  }

  async getByNurseId(nurseId: string): Promise<NurseServiceEntity[]> {
    return this.repo.find({
      where: { nurseId },
      order: { name: 'ASC' },
    });
  }

  async getById(id: string): Promise<NurseServiceEntity> {
    const service = await this.repo.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }
}
