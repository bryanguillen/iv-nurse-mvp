import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { CancelBookingInput } from './dto/cancel-booking.input';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private repo: Repository<BookingEntity>,
  ) {}

  async cancel(input: CancelBookingInput): Promise<BookingEntity> {
    const booking = await this.repo.findOne({ where: { id: input.bookingId } });
    if (!booking) throw new Error('Booking not found');

    booking.status = 'cancelled';
    return this.repo.save(booking);
  }

  async create(input: CreateBookingInput): Promise<BookingEntity> {
    const record = this.repo.create(input);
    return this.repo.save(record);
  }

  async modify(input: UpdateBookingInput): Promise<BookingEntity> {
    const { bookingId, newStartTime, newEndTime } = input;

    const booking = await this.repo.findOne({ where: { id: bookingId } });
    if (!booking) throw new Error('Booking not found');

    booking.startTime = newStartTime;
    booking.endTime = newEndTime;

    return this.repo.save(booking);
  }
}
