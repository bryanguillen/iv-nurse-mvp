import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { CancelBookingInput } from './dto/cancel-booking.input';
import { GetAppointmentsInput } from './dto/get-nurse-bookings.input';
import { Public } from '../auth/supabase-auth.guard';
import { AvailableSlotsDto } from './dto/available-slots.dto';
import { SlotFinderInput } from './dto/slot-finder.input';
import { SlotFinderService } from './slot-finder/slot-finder.service';

@Resolver(() => BookingDto)
export class BookingResolver {
  constructor(
    private service: BookingService,
    private slotFinderService: SlotFinderService,
  ) {}

  @Query(() => [BookingDto])
  async getBookings(
    @Args('input') input: GetAppointmentsInput,
  ): Promise<BookingDto[]> {
    const result = await this.service.getByNurseAndDateOrRange(input);
    return plainToInstance(BookingDto, result);
  }

  @Public()
  @Query(() => [AvailableSlotsDto])
  async getAvailableSlots(
    @Args('input') input: SlotFinderInput,
  ): Promise<AvailableSlotsDto[]> {
    const result = await this.slotFinderService.findSlots(input);
    return plainToInstance(AvailableSlotsDto, result);
  }

  @Public()
  @Mutation(() => BookingDto)
  async cancelBooking(
    @Args('input') input: CancelBookingInput,
  ): Promise<BookingDto> {
    const result = await this.service.cancel(input);
    return plainToInstance(BookingDto, result);
  }

  @Public()
  @Mutation(() => BookingDto)
  async createBooking(
    @Args('input') input: CreateBookingInput,
  ): Promise<BookingDto> {
    const result = await this.service.create(input);
    return plainToInstance(BookingDto, result);
  }

  @Public()
  @Mutation(() => BookingDto)
  async modifyBooking(
    @Args('input') input: UpdateBookingInput,
  ): Promise<BookingDto> {
    const result = await this.service.modify(input);
    return plainToInstance(BookingDto, result);
  }
}
