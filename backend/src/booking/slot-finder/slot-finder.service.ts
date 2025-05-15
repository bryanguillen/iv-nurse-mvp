import { Injectable } from '@nestjs/common';
import { NurseServiceService } from '../../nurse-service/nurse-serivce.service';
import { NurseAvailabilityService } from '../../nurse-availability/nurse-availability.service';
import { SlotFinderInput } from '../dto/slot-finder.input';
import { AvailableSlotsDto } from '../dto/available-slots.dto';

@Injectable()
export class SlotFinderService {
  constructor(
    private nurseServiceService: NurseServiceService,
    private nurseAvailabilityService: NurseAvailabilityService,
  ) {}

  async findSlots(input: SlotFinderInput): Promise<AvailableSlotsDto[]> {
    // const nurseService = await this.nurseServiceService.getByNurseId(input.nurseId);
    // const nurseAvailability = await this.nurseAvailabilityService.getByNurseId(input.nurseId);

    // orchestrate:
    // - fetch data (service duration, nurse availability)
    // - expand availability (convert availability to calendar slots)
    // - filter out conflicts AND out of range slots (ensure dynamic range)
    // - return final result

    // TODO - Return this for now....
    return [];
  }
}
