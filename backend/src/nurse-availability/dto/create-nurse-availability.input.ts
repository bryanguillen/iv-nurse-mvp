import { InputType, Field } from '@nestjs/graphql';

/**
 * Start and end time are in 24 hour format
 * Day of week is 0-6, where 0 is Sunday and 6 is Saturday
 */
@InputType()
export class NurseAvailabilitySlotInput {
  @Field()
  dayOfWeek: number;

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
