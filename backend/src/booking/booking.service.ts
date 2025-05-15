import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private repo: Repository<BookingEntity>,
  ) {}

  async create(input: CreateBookingInput): Promise<BookingEntity> {
    const record = this.repo.create(input);
    return this.repo.save(record);
  }
}
