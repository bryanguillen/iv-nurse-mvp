import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class OrganizationUuid {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;
}
