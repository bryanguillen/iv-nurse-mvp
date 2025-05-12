import { InputType, Field } from '@nestjs/graphql';
import { DayOfWeek } from '../enums/day-of-week.enum';

@InputType()
export class NurseAvailabilitySlotInput {
  @Field(() => DayOfWeek)
  dayOfWeek: DayOfWeek;

  @Field()
  startTime: string;

  @Field()
  endTime: string;
}

@InputType()
export class CreateNurseAvailabilityInput {
  @Field()
  nurseId: string;

  @Field(() => [NurseAvailabilitySlotInput])
  slots: NurseAvailabilitySlotInput[];
}
