import { CalendarIcon, CheckCircle2 } from 'lucide-react';

import { formatInTimeZone } from 'date-fns-tz';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { useBooking } from '../booking-provider';
import type { BookingUserInfo } from './booking-machine';

interface ReviewProps {
  serviceId: string;
  selectedDate: string;
  userInfo: BookingUserInfo;
  confirmed: boolean;
  onConfirm: (confirmed: boolean) => void;
  bookingId: string | null; // If null, we're in the review step
}

// HACK - Technically used for the success step; refactor when time
export function Review({
  serviceId,
  selectedDate,
  userInfo,
  confirmed,
  onConfirm,
  bookingId,
}: ReviewProps) {
  const { nurse } = useBooking();

  const serviceName = nurse?.services.find(service => service.id === serviceId)?.name ?? '';

  const details = [
    ...(bookingId ? [{ label: 'Confirmation Code', value: bookingId }] : []),
    { label: 'Service', value: serviceName },
    {
      label: 'Date',
      value: formatInTimeZone(selectedDate, nurse.timezone, 'MMMM d, yyyy'),
    },
    {
      label: 'Time',
      value: formatInTimeZone(selectedDate, nurse.timezone, 'h:mm a'),
    },
    { label: 'Location', value: userInfo.streetAddress },
  ];

  return (
    <div className="space-y-4">
      {bookingId && (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle2 className="size-5 flex-shrink-0" />
          <p>
            Booking confirmed! You'll receive a text with your appointment details. Save this
            confirmation code for your records.
          </p>
        </div>
      )}
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <CalendarIcon className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Appointment Details</h2>
        </div>

        <div className="space-y-3">
          {details.map(({ label, value }) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </div>
      </div>

      {!bookingId && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="confirm"
            checked={confirmed}
            onCheckedChange={checked => onConfirm(checked === true)}
          />
          <Label htmlFor="confirm">I confirm that all the information above is correct</Label>
        </div>
      )}
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex justify-between">
      <span className="text-muted text-sm">{label}</span>
      <span className="font-medium text-sm">{value}</span>
    </div>
  );
}
