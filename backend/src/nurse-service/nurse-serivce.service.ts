import { Injectable } from '@nestjs/common';
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
}
