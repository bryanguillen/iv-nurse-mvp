import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationUuidEntity } from './organization-uuid.entity';
import { CreateOrganizationUuidInput } from './dto/create-organization-uuid.input';

@Injectable()
export class OrganizationUuidService {
  constructor(
    @InjectRepository(OrganizationUuidEntity)
    private readonly repo: Repository<OrganizationUuidEntity>,
  ) {}

  async create(
    input: CreateOrganizationUuidInput,
  ): Promise<OrganizationUuidEntity> {
    const record = this.repo.create({ id: input.supabaseOrgId });
    return this.repo.save(record);
  }

  async getById(id: string): Promise<OrganizationUuidEntity | null> {
    return this.repo.findOne({ where: { id } });
  }
}
