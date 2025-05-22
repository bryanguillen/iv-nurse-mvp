import { CalendarIcon } from 'lucide-react';

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
}

export function Review({ serviceId, selectedDate, userInfo, confirmed, onConfirm }: ReviewProps) {
  const { nurse } = useBooking();

  const serviceName = nurse?.services.find(service => service.id === serviceId)?.name ?? '';

  const details = [
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
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Appointment Details</h2>
        </div>

        <div className="space-y-3">
          {details.map(({ label, value }) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="confirm"
          checked={confirmed}
          onCheckedChange={checked => onConfirm(checked === true)}
        />
        <Label htmlFor="confirm">I confirm that all the information above is correct</Label>
      </div>
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
      <span className="text-muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
