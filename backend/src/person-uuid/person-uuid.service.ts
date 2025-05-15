import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonUuidEntity } from './person-uuid.entity';
import { CreatePersonUuidInput } from './dto/create-person-uuid.input';

@Injectable()
export class PersonUuidService {
  constructor(
    @InjectRepository(PersonUuidEntity)
    private repo: Repository<PersonUuidEntity>,
  ) {}

  async create(input: CreatePersonUuidInput): Promise<PersonUuidEntity> {
    const record = this.repo.create(input);
    return this.repo.save(record);
  }
}
