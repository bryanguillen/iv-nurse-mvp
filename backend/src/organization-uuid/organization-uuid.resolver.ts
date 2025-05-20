import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrganizationUuidService } from './organization-uuid.service';
import { CreateOrganizationUuidInput } from './dto/create-organization-uuid.input';
import { OrganizationUuid } from './dto/organization-uuid.type';
import { Public } from '../auth/supabase-auth.guard';

@Resolver(() => OrganizationUuid)
export class OrganizationUuidResolver {
  constructor(private readonly service: OrganizationUuidService) {}

  @Public()
  @Query(() => OrganizationUuid)
  async getOrganizationRecord(
    @Args('id') id: string,
  ): Promise<OrganizationUuid | null> {
    return this.service.getById(id);
  }

  @Mutation(() => OrganizationUuid)
  createOrganizationRecord(
    @Args('input') input: CreateOrganizationUuidInput,
  ): Promise<OrganizationUuid> {
    return this.service.create(input);
  }
}
