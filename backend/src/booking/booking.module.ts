import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity])],
  providers: [BookingService, BookingResolver],
})
export class BookingModule {}
