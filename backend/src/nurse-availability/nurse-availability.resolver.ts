import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { NurseAvailabilityService } from './nurse-availability.service';
import { CreateNurseAvailabilityInput } from './dto/create-nurse-availability.input';
import { NurseAvailabilityDto } from './dto/nurse-availability.dto';
import { DeleteNurseAvailabilityInput } from './dto/delete-nurse-availability.input';

@Resolver(() => NurseAvailabilityDto)
export class NurseAvailabilityResolver {
  constructor(private service: NurseAvailabilityService) {}

  @Mutation(() => [NurseAvailabilityDto])
  configureAvailability(
    @Args('input') input: CreateNurseAvailabilityInput,
  ): Promise<NurseAvailabilityDto[]> {
    return this.service.createAvailability(input);
  }

  @Mutation(() => Boolean)
  async deleteAvailabilityByIds(
    @Args('input') input: DeleteNurseAvailabilityInput,
  ): Promise<boolean> {
    const deleted = await this.service.deleteAvailabilityByIds(
      input.availabilityIds,
    );
    return deleted > 0;
  }

  @Query(() => [NurseAvailabilityDto])
  async getAvailabilityByNurseId(
    @Args('nurseId') nurseId: string,
  ): Promise<NurseAvailabilityDto[]> {
    const entities = await this.service.getByNurseId(nurseId);
    return entities;
  }
}
