import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Nurse {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  org_name?: string;
}
