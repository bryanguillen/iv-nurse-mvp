import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationUuidEntity } from './organization-uuid.entity';
import { OrganizationUuidService } from './organization-uuid.service';
import { OrganizationUuidResolver } from './organization-uuid.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationUuidEntity])],
  providers: [OrganizationUuidService, OrganizationUuidResolver],
})
export class OrganizationUuidModule {}
