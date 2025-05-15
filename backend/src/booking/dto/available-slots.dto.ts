import { Field } from '@nestjs/graphql';

export class AvailableSlotsDto {
  @Field()
  nurseId: string;

  @Field()
  serviceId: string;
  @Field()
  startTime: Date;

  @Field()
  endTime: Date;
}
