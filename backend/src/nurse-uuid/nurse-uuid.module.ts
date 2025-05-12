import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NurseUuidEntity } from './nurse-uuid.entity';
import { NurseUuidService } from './nurse-uuid.service';
import { NurseUuidResolver } from './nurse-uuid.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([NurseUuidEntity])],
  providers: [NurseUuidService, NurseUuidResolver],
})
export class NurseUuidModule {}
