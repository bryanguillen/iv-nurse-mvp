import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { NurseStatsService } from './nurse-stats.service';
import { NurseStatsDto } from './dto/nurse-stats.dto';
import { CreateNurseStatsInput } from './dto/create-nurse-stats.input';
import { UpdateNurseStatsInput } from './dto/update-nurse-stats.input';

@Resolver(() => NurseStatsDto)
export class NurseStatsResolver {
  constructor(private service: NurseStatsService) {}

  @Mutation(() => NurseStatsDto)
  async createNurseStats(
    @Args('input') input: CreateNurseStatsInput,
  ): Promise<NurseStatsDto> {
    const result = await this.service.create(input);
    return plainToInstance(NurseStatsDto, result);
  }

  @Mutation(() => NurseStatsDto)
  async updateNurseStats(
    @Args('input') input: UpdateNurseStatsInput,
  ): Promise<NurseStatsDto> {
    const result = await this.service.update(input);
    return plainToInstance(NurseStatsDto, result);
  }

  @Query(() => [NurseStatsDto])
  async getNurseStats(
    @Args('nurseId') nurseId: string,
  ): Promise<NurseStatsDto[]> {
    const result = await this.service.getByNurseId(nurseId);
    return plainToInstance(NurseStatsDto, result);
  }
}
