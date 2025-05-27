import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { PersonUuidService } from './person-uuid.service';
import { PersonUuidDto } from './dto/person-uuid.dto';
import { CreatePersonUuidInput } from './dto/create-person-uuid.input';
import { Public } from '../auth/supabase-auth.guard';

@Resolver(() => PersonUuidDto)
export class PersonUuidResolver {
  constructor(private service: PersonUuidService) {}

  @Public()
  @Mutation(() => PersonUuidDto)
  async createPersonUuid(
    @Args('input') input: CreatePersonUuidInput,
  ): Promise<PersonUuidDto> {
    const personUuid = await this.service.create(input);
    return plainToInstance(PersonUuidDto, personUuid);
  }

  @Public()
  @Query(() => PersonUuidDto, { nullable: true })
  async getPersonBySupabaseId(
    @Args('supabaseId') supabaseId: string,
  ): Promise<PersonUuidDto | null> {
    const personUuid = await this.service.getBySupabaseId(supabaseId);
    return personUuid ? plainToInstance(PersonUuidDto, personUuid) : null;
  }
}
