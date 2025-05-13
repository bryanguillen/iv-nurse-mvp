import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { NurseServiceService } from './nurse-serivce.service';
import { CreateNurseServicesInput } from './dto/create-nurse-services.input';
import { NurseServiceDto } from './dto/nurse-service.dto';
import { DeleteNurseServicesInput } from './dto/delete-nurse-services.input';

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

  @Mutation(() => Boolean)
  async deleteNurseServicesByIds(
    @Args('input') input: DeleteNurseServicesInput,
  ): Promise<boolean> {
    const deleted = await this.service.deleteByIds(input.serviceIds);
    return deleted > 0;
  }
}
