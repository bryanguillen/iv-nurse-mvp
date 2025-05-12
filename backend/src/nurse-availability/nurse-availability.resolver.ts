import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NurseAvailabilityService } from './nurse-availability.service';
import { CreateNurseAvailabilityInput } from './dto/create-nurse-availability.input';
import { NurseAvailabilityDto } from './dto/nurse-availability.dto';

@Resolver(() => NurseAvailabilityDto)
export class NurseAvailabilityResolver {
  constructor(private service: NurseAvailabilityService) {}

  @Mutation(() => [NurseAvailabilityDto])
  configureAvailability(
    @Args('input') input: CreateNurseAvailabilityInput,
  ): Promise<NurseAvailabilityDto[]> {
    return this.service.createAvailability(input);
  }
}
