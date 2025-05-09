import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Nurse {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  orgName?: string;
}
