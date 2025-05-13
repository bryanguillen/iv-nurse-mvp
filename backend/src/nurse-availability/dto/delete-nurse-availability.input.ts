import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteNurseAvailabilityInput {
  @Field(() => [String])
  availabilityIds: string[];
}
