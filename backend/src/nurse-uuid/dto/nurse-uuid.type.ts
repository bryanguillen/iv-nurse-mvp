import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NurseServiceDto } from '../../nurse-service/dto/nurse-service.dto';
import { OrganizationUuid } from '../../organization-uuid/dto/organization-uuid.type';

@ObjectType()
export class NurseUuid {
  @Field(() => ID)
  id: string;

  @Field()
  supabaseId: string;

  @Field()
  timezone: string;

  @Field(() => [NurseServiceDto])
  services: NurseServiceDto[];

  @Field(() => OrganizationUuid)
  organization: OrganizationUuid;

  @Field()
  createdAt: Date;
}
