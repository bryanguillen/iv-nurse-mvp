import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrganizationUuidInput {
  @Field()
  supabaseOrgId: string;
}
