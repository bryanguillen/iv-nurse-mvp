import { ObjectType, Field } from '@nestjs/graphql';

import { NurseServiceDto } from '../../nurse-service/dto/nurse-service.dto';
import { PersonUuidDto } from '../../person-uuid/dto/person-uuid.dto';

@ObjectType()
export class BookingDto {
  @Field()
  id: string;

  @Field()
  nurseId: string;

  @Field(() => PersonUuidDto)
  person: PersonUuidDto;

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
