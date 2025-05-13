import { InputType, Field } from '@nestjs/graphql';

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
