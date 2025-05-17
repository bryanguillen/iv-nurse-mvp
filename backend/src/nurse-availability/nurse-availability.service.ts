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

    // Create an array of records from the slots
    const records = slots.map((slot) =>
      this.repo.create({
        nurseId,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
        timezone: slot.timezone,
      }),
    );

    // Save and return the array of records
    return this.repo.save(records);
  }

  async deleteAvailabilityByIds(ids: string[]): Promise<number> {
    const result = await this.repo.delete(ids);
    return result.affected ?? 0;
  }

  async getByNurseId(nurseId: string): Promise<NurseAvailabilityEntity[]> {
    return this.repo.find({
      where: { nurseId },
      order: { dayOfWeek: 'ASC', startTime: 'ASC' },
    });
  }
}
