import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class NurseUuid {
  @Field(() => ID)
  id: string;

  @Field()
  supabaseId: string;

  @Field()
  timezone: string;

  @Field()
  createdAt: Date;
}
