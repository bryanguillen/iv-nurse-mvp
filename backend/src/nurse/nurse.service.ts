import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NurseEntity } from './nurse.entity';

@Injectable()
export class NurseService {
  constructor(
    @InjectRepository(NurseEntity)
    private nurseRepository: Repository<NurseEntity>,
  ) {}

  async findAll(): Promise<NurseEntity[]> {
    return this.nurseRepository.find();
  }
}
