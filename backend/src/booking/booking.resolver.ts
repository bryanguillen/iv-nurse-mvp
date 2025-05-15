import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';

@Resolver(() => BookingDto)
export class BookingResolver {
  constructor(private service: BookingService) {}

  @Mutation(() => BookingDto)
  async createBooking(
    @Args('input') input: CreateBookingInput,
  ): Promise<BookingDto> {
    const result = await this.service.create(input);
    return plainToInstance(BookingDto, result);
  }

  @Mutation(() => BookingDto)
  async modifyBooking(
    @Args('input') input: UpdateBookingInput,
  ): Promise<BookingDto> {
    const result = await this.service.modify(input);
    return plainToInstance(BookingDto, result);
  }
}
