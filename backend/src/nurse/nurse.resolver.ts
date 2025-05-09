import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { Nurse } from './nurse.type';

@Resolver(() => Nurse)
@UseGuards(SupabaseAuthGuard)
export class NurseResolver {
  @Query(() => Nurse)
  getCurrentNurse(): Nurse {
    return {
      id: '123',
      email: 'test@nurse.com',
      first_name: 'Test',
      last_name: 'User',
      org_name: 'Healing Hands',
    };
  }
}
