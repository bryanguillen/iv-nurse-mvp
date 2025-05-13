import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteNurseServicesInput {
  @Field(() => [String])
  serviceIds: string[];
}
