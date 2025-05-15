import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { CancelBookingInput } from './dto/cancel-booking.input';
import { GetAppointmentsInput } from './dto/get-nurse-bookings.input';

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

  async getByNurseAndDateOrRange(
    input: GetAppointmentsInput,
  ): Promise<BookingEntity[]> {
    const { nurseId, start, end } = input;

    const query = this.repo
      .createQueryBuilder('booking')
      .where('booking.nurseId = :nurseId', { nurseId });

    if (!end) {
      const startOfDay = new Date(start + 'T00:00:00.000Z');
      const endOfDay = new Date(start + 'T23:59:59.999Z');
      query.andWhere('booking.startTime BETWEEN :start AND :end', {
        start: startOfDay,
        end: endOfDay,
      });
    } else {
      const startOfDay = new Date(start + 'T00:00:00.000Z');
      const endOfDay = new Date(end + 'T23:59:59.999Z');
      query.andWhere('booking.startTime BETWEEN :start AND :end', {
        start: startOfDay,
        end: endOfDay,
      });
    }

    return query.orderBy('booking.startTime', 'ASC').getMany();
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
