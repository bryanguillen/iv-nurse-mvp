import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { OrganizationUuidService } from './organization-uuid.service';
import { CreateOrganizationUuidInput } from './dto/create-organization-uuid.input';
import { OrganizationUuid } from './organization-uuid.type';

@Resolver(() => OrganizationUuid)
export class OrganizationUuidResolver {
  constructor(private readonly service: OrganizationUuidService) {}

  @Mutation(() => OrganizationUuid)
  createOrganizationRecord(
    @Args('input') input: CreateOrganizationUuidInput,
  ): Promise<OrganizationUuid> {
    return this.service.create(input);
  }
}
