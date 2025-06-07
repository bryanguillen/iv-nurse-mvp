import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { fromZonedTime } from 'date-fns-tz';
import { BookingEntity } from './booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { CancelBookingInput } from './dto/cancel-booking.input';
import { GetAppointmentsInput } from './dto/get-nurse-bookings.input';
import { NurseUuidService } from '../nurse-uuid/nurse-uuid.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private repo: Repository<BookingEntity>,
    private nurseUuidService: NurseUuidService,
  ) {}

  async cancel(input: CancelBookingInput): Promise<BookingEntity> {
    const booking = await this.repo.findOne({
      where: { id: input.bookingId },
      relations: ['person'],
    });

    if (!booking) throw new Error('Booking not found');

    booking.status = 'cancelled';
    return this.repo.save(booking);
  }

  async create(input: CreateBookingInput): Promise<BookingEntity> {
    const record = this.repo.create(input);
    const saved = await this.repo.save(record);

    const found = await this.repo.findOne({
      where: { id: saved.id },
      relations: ['person'],
    });

    if (!found) return saved;

    return found;
  }

  async getByNurseAndDateOrRange(
    input: GetAppointmentsInput,
  ): Promise<BookingEntity[]> {
    const { nurseId, start, end } = input;

    const nurse = await this.nurseUuidService.getNurseById(nurseId);
    const timezone = nurse.timezone;

    const query = this.repo
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.service', 'service')
      .leftJoinAndSelect('booking.person', 'person')
      .where('booking.nurseId = :nurseId', { nurseId });

    if (!end) {
      const startUtc = fromZonedTime(`${start}T00:00:00`, timezone);
      const endUtc = fromZonedTime(`${start}T23:59:59.999`, timezone);

      query.andWhere('booking.startTime BETWEEN :start AND :end', {
        start: startUtc,
        end: endUtc,
      });
    } else {
      const startUtc = fromZonedTime(`${start}T00:00:00`, timezone);
      const endUtc = fromZonedTime(`${end}T23:59:59.999`, timezone);

      query.andWhere('booking.startTime BETWEEN :start AND :end', {
        start: startUtc,
        end: endUtc,
      });
    }

    return query.orderBy('booking.startTime', 'ASC').getMany();
  }

  async modify(input: UpdateBookingInput): Promise<BookingEntity> {
    const { bookingId, newStartTime, newEndTime } = input;

    const booking = await this.repo.findOne({
      where: { id: bookingId },
      relations: ['person'],
    });

    if (!booking) throw new Error('Booking not found');

    booking.startTime = newStartTime;
    booking.endTime = newEndTime;

    const saved = await this.repo.save(booking);
    const found = await this.repo.findOne({
      where: { id: saved.id },
      relations: ['person'],
    });

    if (!found) return saved;

    return found;
  }

  async getById(id: string): Promise<BookingEntity> {
    const booking = await this.repo.findOne({
      where: { id },
      relations: ['nurse', 'service'],
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }
}
