import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class NurseServiceSlotInput {
  @Field()
  name: string;

  @Field(() => Int)
  durationMinutes: number;

  @Field(() => Float, { nullable: true })
  price?: number;
}

@InputType()
export class CreateNurseServicesInput {
  @Field()
  nurseId: string;

  @Field(() => [NurseServiceSlotInput])
  services: NurseServiceSlotInput[];
}
