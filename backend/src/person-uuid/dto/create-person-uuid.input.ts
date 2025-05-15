import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePersonUuidInput {
  @Field()
  supabaseId: string;
}
