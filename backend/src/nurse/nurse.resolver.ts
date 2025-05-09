import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { Nurse } from './nurse.type';
import { NurseService } from './nurse.service';

@Resolver(() => Nurse)
@UseGuards(SupabaseAuthGuard)
export class NurseResolver {
  constructor(private nurseService: NurseService) {}

  @Query(() => [Nurse])
  async getAllNurses(): Promise<Nurse[]> {
    const nurses = await this.nurseService.findAll();
    return nurses;
  }
}
