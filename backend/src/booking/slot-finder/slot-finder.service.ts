import { Injectable } from '@nestjs/common';
import { addMinutes, isBefore, isAfter, set, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { NurseServiceService } from '../../nurse-service/nurse-serivce.service';
import { NurseAvailabilityService } from '../../nurse-availability/nurse-availability.service';
import { BookingService } from '../../booking/booking.service';
import { SlotFinderInput } from '../dto/slot-finder.input';
import { AvailableSlotsDto } from '../dto/available-slots.dto';
import { NurseUuidService } from '../../nurse-uuid/nurse-uuid.service';

@Injectable()
export class SlotFinderService {
  constructor(
    private nurseServiceService: NurseServiceService,
    private nurseAvailabilityService: NurseAvailabilityService,
    private bookingService: BookingService,
    private nurseUuidService: NurseUuidService,
  ) {}

  async findSlots(input: SlotFinderInput): Promise<AvailableSlotsDto[]> {
    const { nurseId, serviceId, start } = input; // 'start' is YYYY-MM-DD string
    const date = parseISO(start);

    // --- Fetch core data ---
    const service = await this.nurseServiceService.getById(serviceId);
    const durationMinutes = service.durationMinutes;
    const nurseAvailability =
      await this.nurseAvailabilityService.getByNurseId(nurseId);
    const nurse = await this.nurseUuidService.getNurseById(nurseId);
    const nurseTimezone = nurse.timezone;
    const bookings = await this.bookingService.getByNurseAndDateOrRange({
      nurseId,
      start,
    });

    // --- Build blocked ranges: each appointment + 20 min before and after ---
    const blockedRanges = bookings.map((booking) => ({
      start: addMinutes(booking.startTime, -20),
      end: addMinutes(booking.endTime, 20),
    }));

    const results: AvailableSlotsDto[] = [];

    // --- Process each nurse availability window for the given day ---
    for (const availability of nurseAvailability) {
      if (availability.dayOfWeek !== date.getDay()) continue;

      // Convert local availability times into UTC window
      const windowStartUtc = this.localTimeToUtc(
        start,
        availability.startTime,
        nurseTimezone,
      );
      const windowEndUtc = addMinutes(
        this.localTimeToUtc(start, availability.endTime, nurseTimezone),
        15,
      );

      // Initialize first slot start, rounded up to nearest 5 min
      let slotStart = this.roundUpToNearestFive(windowStartUtc);

      // Step through the window by service duration
      while (isBefore(addMinutes(slotStart, durationMinutes), windowEndUtc)) {
        const slotEnd = addMinutes(slotStart, durationMinutes);

        // Check if slot overlaps with any blocked (buffered) ranges
        const overlaps = blockedRanges.some(
          (block) =>
            isBefore(slotStart, block.end) && isAfter(slotEnd, block.start),
        );

        // If no overlap, add to results
        if (!overlaps) {
          results.push({
            nurseId,
            serviceId,
            startTime: slotStart,
            endTime: slotEnd,
          });
        }

        // Advance to next slot (duration step + re-rounding)
        slotStart = this.roundUpToNearestFive(
          addMinutes(slotStart, durationMinutes),
        );
      }
    }

    // --- Return all available slots ---
    return results;
  }

  // Helper: Convert local time string (HH:mm) on a date (YYYY-MM-DD) into UTC Date object
  private localTimeToUtc(
    dateStr: string,
    timeStr: string,
    timezone: string,
  ): Date {
    // First, create an ISO string in the target timezone
    const isoString = formatInTimeZone(
      `${dateStr}T${timeStr}`,
      timezone,
      "yyyy-MM-dd'T'HH:mm:ssXXX",
    );

    // Then parse it as UTC
    return new Date(isoString);
  }

  // Helper: Round Date up to nearest 5-minute mark
  private roundUpToNearestFive(date: Date): Date {
    const minutes = date.getUTCMinutes();
    const roundedMinutes = Math.ceil(minutes / 5) * 5;
    return set(date, { minutes: roundedMinutes, seconds: 0, milliseconds: 0 });
  }
}
