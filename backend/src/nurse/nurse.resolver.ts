import { Resolver, Query } from '@nestjs/graphql';
import { Nurse } from './nurse.type';

@Resolver(() => Nurse)
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
