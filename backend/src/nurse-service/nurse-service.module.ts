import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NurseServiceEntity } from './nurse-service.entity';
import { NurseServiceService } from './nurse-serivce.service';
import { NurseServiceResolver } from './nurse-service.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([NurseServiceEntity])],
  providers: [NurseServiceService, NurseServiceResolver],
  exports: [NurseServiceService],
})
export class NurseServiceModule {}
