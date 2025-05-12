import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { NurseUuid } from './dto/nurse-uuid.type';
import { NurseUuidService } from './nurse-uuid.service';
import { CreateNurseUuidInput } from './dto/nurse-uuid.input';

@Resolver(() => NurseUuid)
@UseGuards(SupabaseAuthGuard)
export class NurseUuidResolver {
  constructor(private nurseUuidService: NurseUuidService) {}

  @Mutation(() => NurseUuid)
  async createNurseUuid(
    @Args('input') input: CreateNurseUuidInput,
  ): Promise<NurseUuid> {
    return this.nurseUuidService.createNurseUuid(input.supabaseId);
  }

  /**
   * TEMP HACK: Remove once other queries are implemented, as
   * this stops the query root hack.
   */
  @Query(() => NurseUuid, { nullable: true })
  async getNurseUuids(): Promise<NurseUuid | null> {
    return null;
  }
}
