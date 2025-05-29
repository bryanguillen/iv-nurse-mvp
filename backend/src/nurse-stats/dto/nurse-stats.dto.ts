import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class NurseStatsDto {
  @Field(() => ID)
  id: string;

  @Field()
  nurseId: string;

  @Field(() => Int)
  rebookingsCount: number;

  @Field(() => Int)
  newCustomersCount: number;

  @Field(() => Float)
  rebookingsRevenue: number;

  @Field(() => Float)
  newCustomersRevenue: number;

  @Field(() => Float)
  totalRevenue: number;

  @Field()
  createdAt: Date;
}
