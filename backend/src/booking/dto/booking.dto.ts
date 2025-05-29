import { ObjectType, Field } from '@nestjs/graphql';

import { NurseServiceDto } from '../../nurse-service/dto/nurse-service.dto';

@ObjectType()
export class BookingDto {
  @Field()
  id: string;

  @Field()
  nurseId: string;

  @Field()
  personId: string;

  @Field(() => NurseServiceDto)
  service: NurseServiceDto;

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
