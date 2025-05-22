import { CalendarIcon } from 'lucide-react';
import { format, isBefore, isSameDay, startOfToday, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useGetOpenSlotsForDateQuery } from '@/gql/queries/GetOpenSlotsForDate.generated';
import { useBooking } from '../booking-provider';
import { Spinner } from '@/components/ui/spinner';

interface DateSelectorProps {
  selectedDate: string | undefined;
  serviceId: string;
  onDateSelect: (date: string | undefined) => void;
}

export function DateSelector({ selectedDate, serviceId, onDateSelect }: DateSelectorProps) {
  const { nurse } = useBooking();

  const [localDate, setLocalDate] = useState<string | undefined>(selectedDate);
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { data, loading } = useGetOpenSlotsForDateQuery({
    variables: {
      nurseId: nurse.id,
      serviceId,
      start: localDate ?? '',
    },
    skip: !localDate,
  });

  // Disable all days before today (and today itself)
  const disableBeforeToday = (date: Date) => {
    const today = startOfToday(); // in local timezone
    return isBefore(date, today) || isSameDay(date, today);
  };

  const handleDateSelect = (date: Date | undefined) => {
    const dateString = date ? format(date, 'yyyy-MM-dd') : undefined;
    setLocalDate(dateString);

    // Reset selected slot when date changes
    setSelectedSlot(undefined);
    onDateSelect('');

    // Close the calendar
    setCalendarOpen(false);
  };

  const handleSlotSelect = (slotTime: string) => {
    setSelectedSlot(slotTime);
    onDateSelect(slotTime);
  };

  const displayDate = localDate ? parseISO(localDate) : undefined;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Select a date</h2>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !localDate && 'text-muted'
              )}
            >
              <CalendarIcon className="mr-2 size-4" />
              {displayDate ? format(displayDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={displayDate}
              onSelect={handleDateSelect}
              disabled={disableBeforeToday}
              modifiers={{ today: () => false }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Select a time slot</h2>
        {!localDate && <i className="text-muted">Please select a date to see slots.</i>}

        {loading && <Spinner />}

        {!loading && localDate && !data?.getAvailableSlots.length && (
          <p>No slots available for this date. Please select a different date.</p>
        )}

        {!loading && localDate && !!data?.getAvailableSlots.length && (
          <div className="grid gap-2">
            {data?.getAvailableSlots.map((slot, index) => {
              const formattedTimeForSlot = formatInTimeZone(
                slot.startTime,
                nurse.timezone,
                'h:mm a'
              );
              const isSelected = selectedSlot === slot.startTime;

              return (
                <Button
                  key={index}
                  onClick={() => handleSlotSelect(slot.startTime)}
                  variant={isSelected ? 'default' : 'outline'}
                >
                  {formattedTimeForSlot}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
