import { InputType, Field, Float, Int, ID } from '@nestjs/graphql';

@InputType()
export class UpdateNurseStatsInput {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  rebookingsCount?: number;

  @Field(() => Int, { nullable: true })
  newCustomersCount?: number;

  @Field(() => Float, { nullable: true })
  rebookingsRevenue?: number;

  @Field(() => Float, { nullable: true })
  newCustomersRevenue?: number;

  @Field(() => Float, { nullable: true })
  totalRevenue?: number;
}
