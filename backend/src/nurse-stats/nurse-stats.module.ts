import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NurseStatsEntity } from './nurse-stats.entity';
import { NurseStatsService } from './nurse-stats.service';
import { NurseStatsResolver } from './nurse-stats.resolver';
import { NurseUuidModule } from '../nurse-uuid/nurse-uuid.module';

@Module({
  imports: [TypeOrmModule.forFeature([NurseStatsEntity]), NurseUuidModule],
  providers: [NurseStatsService, NurseStatsResolver],
  exports: [NurseStatsService],
})
export class NurseStatsModule {}
