import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NurseAvailabilityEntity } from './nurse-availability.entity';
import { CreateNurseAvailabilityInput } from './dto/create-nurse-availability.input';

@Injectable()
export class NurseAvailabilityService {
  constructor(
    @InjectRepository(NurseAvailabilityEntity)
    private repo: Repository<NurseAvailabilityEntity>,
  ) {}

  async createAvailability(
    input: CreateNurseAvailabilityInput,
  ): Promise<NurseAvailabilityEntity[]> {
    const { nurseId, slots } = input;
    const records = slots.map((slot) => this.repo.create({ nurseId, ...slot }));
    return this.repo.save(records);
  }
}
