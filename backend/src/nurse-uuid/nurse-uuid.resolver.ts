import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { NurseUuid } from './dto/nurse-uuid.type';
import { NurseUuidService } from './nurse-uuid.service';
import { CreateNurseUuidInput } from './dto/nurse-uuid.input';
import { Public } from '../auth/supabase-auth.guard';

@Resolver(() => NurseUuid)
@UseGuards(SupabaseAuthGuard)
export class NurseUuidResolver {
  constructor(private nurseUuidService: NurseUuidService) {}

  @Mutation(() => NurseUuid)
  async createNurseUuid(
    @Args('input') input: CreateNurseUuidInput,
  ): Promise<NurseUuid> {
    const nurseUuid = await this.nurseUuidService.createNurseUuid(
      input.supabaseId,
      input.organizationId,
      input.timezone,
    );
    return plainToInstance(NurseUuid, nurseUuid);
  }

  @Query(() => NurseUuid, { nullable: true })
  async getSelfAsNurse(@Context() context: any): Promise<NurseUuid | null> {
    const supabaseId = context.user.id;
    const nurseUuid =
      await this.nurseUuidService.getNurseBySupabaseId(supabaseId);
    return plainToInstance(NurseUuid, nurseUuid);
  }

  @Public()
  @Query(() => NurseUuid, { nullable: true })
  async getNurseById(@Args('id') id: string): Promise<NurseUuid | null> {
    const nurseUuid = await this.nurseUuidService.getNurseById(id);
    return plainToInstance(NurseUuid, nurseUuid);
  }
}
