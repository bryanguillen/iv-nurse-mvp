import { ObjectType, Field } from '@nestjs/graphql';
import { DayOfWeek } from '../enums/day-of-week.enum';

@ObjectType()
export class NurseAvailabilityDto {
  @Field()
  id: string;

  @Field()
  nurseId: string;

  @Field(() => DayOfWeek)
  dayOfWeek: DayOfWeek;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field()
  createdAt: Date;
}
