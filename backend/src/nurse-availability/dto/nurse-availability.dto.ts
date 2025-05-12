import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class NurseAvailabilityDto {
  @Field()
  id: string;

  @Field()
  nurseId: string;

  @Field()
  dayOfWeek: string;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field()
  createdAt: Date;
}
