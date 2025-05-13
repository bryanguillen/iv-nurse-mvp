import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { NurseServiceService } from './nurse-serivce.service';
import { CreateNurseServicesInput } from './dto/create-nurse-services.input';
import { NurseServiceDto } from './dto/nurse-service.dto';

@Resolver(() => NurseServiceDto)
export class NurseServiceResolver {
  constructor(private service: NurseServiceService) {}

  @Mutation(() => [NurseServiceDto])
  async configureNurseServices(
    @Args('input') input: CreateNurseServicesInput,
  ): Promise<NurseServiceDto[]> {
    const entities = await this.service.createMany(input);
    return entities.map((entity) => plainToInstance(NurseServiceDto, entity));
  }
}
