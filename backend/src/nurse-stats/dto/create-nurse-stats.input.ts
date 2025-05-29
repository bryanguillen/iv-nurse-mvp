import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateNurseStatsInput {
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
}
