import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateBookingInput {
  @Field()
  bookingId: string;

  @Field()
  newStartTime: Date;

  @Field()
  newEndTime: Date;
}
