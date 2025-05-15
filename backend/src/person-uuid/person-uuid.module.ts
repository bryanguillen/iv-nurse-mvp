import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonUuidService } from './person-uuid.service';
import { PersonUuidEntity } from './person-uuid.entity';
import { PersonUuidResolver } from './person-uuid.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PersonUuidEntity])],
  providers: [PersonUuidService, PersonUuidResolver],
})
export class PersonUuidModule {}
