import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class NurseServiceDto {
  @Field()
  id: string;

  @Field()
  nurseId: string;

  @Field()
  name: string;

  @Field(() => Int)
  durationMinutes: number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field()
  createdAt: Date;
}
