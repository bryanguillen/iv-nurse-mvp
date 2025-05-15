import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CancelBookingInput {
  @Field()
  bookingId: string;
}
