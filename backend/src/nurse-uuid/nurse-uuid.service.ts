import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NurseUuidEntity } from './nurse-uuid.entity';

@Injectable()
export class NurseUuidService {
  constructor(
    @InjectRepository(NurseUuidEntity)
    private nurseUuidRepository: Repository<NurseUuidEntity>,
  ) {}

  async createNurseUuid(
    nurseId: string,
    timezone: string,
  ): Promise<NurseUuidEntity> {
    const nurseUuid = this.nurseUuidRepository.create({
      supabaseId: nurseId,
      timezone,
    });
    return this.nurseUuidRepository.save(nurseUuid);
  }

  async getNurseBySupabaseId(
    supabaseId: string,
  ): Promise<NurseUuidEntity | null> {
    return this.nurseUuidRepository.findOne({
      where: { supabaseId },
    });
  }
}
