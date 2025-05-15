import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { CreateBookingInput } from './dto/create-booking.input';

@Resolver(() => BookingDto)
export class BookingResolver {
  constructor(private service: BookingService) {}

  @Mutation(() => BookingDto)
  async createBooking(
    @Args('input') input: CreateBookingInput,
  ): Promise<BookingDto> {
    const result = await this.service.create(input);
    return result;
  }
}
