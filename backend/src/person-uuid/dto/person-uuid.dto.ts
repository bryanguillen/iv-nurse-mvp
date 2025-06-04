import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PersonUuidDto {
  @Field()
  id: string;

  @Field()
  supabaseId: string;

  @Field()
  createdAt: Date;
}
