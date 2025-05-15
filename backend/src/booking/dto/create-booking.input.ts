import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookingInput {
  @Field()
  nurseId: string;

  @Field()
  personId: string;

  @Field()
  serviceId: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field({ nullable: true })
  notes?: string;
}
