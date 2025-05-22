import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
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
