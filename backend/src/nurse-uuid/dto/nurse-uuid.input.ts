import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNurseUuidInput {
  @Field()
  supabaseId: string;

  @Field()
  organizationId: string;

  @Field()
  timezone: string;
}
