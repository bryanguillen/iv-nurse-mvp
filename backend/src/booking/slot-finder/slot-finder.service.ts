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
    // - fetch data (service duration, nurse availability) [DONE]
    // - expand availability (convert availability to calendar slots)
    // - filter out conflicts AND out of range slots (ensure dynamic range)
    // - return final result

    // Mock slots for 9 AM and 10 AM EST (14:00 and 15:00 UTC)
    return [
      {
        nurseId: input.nurseId,
        serviceId: input.serviceId,
        startTime: new Date('2024-03-20T14:00:00Z'), // 9 AM EST
        endTime: new Date('2024-03-20T15:00:00Z'), // 10 AM EST
      },
      {
        nurseId: input.nurseId,
        serviceId: input.serviceId,
        startTime: new Date('2024-03-20T15:00:00Z'), // 10 AM EST
        endTime: new Date('2024-03-20T16:00:00Z'), // 11 AM EST
      },
    ];
  }
}
