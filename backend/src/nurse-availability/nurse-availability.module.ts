import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NurseAvailabilityEntity } from './nurse-availability.entity';
import { NurseAvailabilityService } from './nurse-availability.service';
import { NurseAvailabilityResolver } from './nurse-availability.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([NurseAvailabilityEntity])],
  providers: [NurseAvailabilityService, NurseAvailabilityResolver],
  exports: [NurseAvailabilityService],
})
export class NurseAvailabilityModule {}
