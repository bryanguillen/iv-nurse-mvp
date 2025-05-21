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

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean, { nullable: true })
  topPick?: boolean;

  @Field()
  createdAt: Date;
}
