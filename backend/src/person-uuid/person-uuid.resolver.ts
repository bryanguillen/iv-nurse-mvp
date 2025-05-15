import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PersonUuidService } from './person-uuid.service';
import { PersonUuidDto } from './dto/person-uuid.dto';
import { CreatePersonUuidInput } from './dto/create-person-uuid.input';

@Resolver(() => PersonUuidDto)
export class PersonUuidResolver {
  constructor(private service: PersonUuidService) {}

  @Mutation(() => PersonUuidDto)
  async createPersonUuid(
    @Args('input') input: CreatePersonUuidInput,
  ): Promise<PersonUuidDto> {
    return await this.service.create(input);
  }
}
