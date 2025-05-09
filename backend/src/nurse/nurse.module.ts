import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NurseResolver } from './nurse.resolver';
import { NurseService } from './nurse.service';
import { NurseEntity } from './nurse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NurseEntity])],
  providers: [NurseResolver, NurseService],
})
export class NurseModule {}
