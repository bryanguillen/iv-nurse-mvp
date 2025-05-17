import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { NurseServiceModule } from '../nurse-service/nurse-service.module';
import { NurseAvailabilityModule } from '../nurse-availability/nurse-availability.module';
import { NurseUuidModule } from '../nurse-uuid/nurse-uuid.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity]),
    NurseServiceModule,
    NurseAvailabilityModule,
    NurseUuidModule,
  ],
  providers: [BookingService, BookingResolver],
  exports: [BookingService],
})
export class BookingModule {}
