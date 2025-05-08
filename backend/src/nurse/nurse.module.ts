import { Module } from '@nestjs/common';
import { NurseResolver } from './nurse.resolver';

@Module({
  providers: [NurseResolver],
})
export class NurseModule {}
