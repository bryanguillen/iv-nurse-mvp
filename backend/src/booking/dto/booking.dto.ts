import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BookingDto {
  @Field()
  id: string;

  @Field()
  nurseId: string;

  @Field()
  personId: string;

  @Field()
  serviceId: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  status: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
