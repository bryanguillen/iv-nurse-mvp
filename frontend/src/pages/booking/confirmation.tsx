import { useParams } from 'react-router-dom';
import { CalendarIcon, CheckCircle2 } from 'lucide-react';
import { formatInTimeZone } from 'date-fns-tz';

import { useGetBookingByIdQuery } from '@/gql/queries/GetBookingById.generated';
import shortUuid from '@/config/short-uuid';
import { Spinner, PageContainer } from '@/components';

export function BookingConfirmation() {
  const { shortId } = useParams<{ shortId: string }>();
  const bookingId = shortUuid.toUUID(shortId!);

  const { data, loading, error } = useGetBookingByIdQuery({
    variables: { id: bookingId },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error || !data?.getBookingById) {
    return <div>Booking not found</div>;
  }

  const booking = data.getBookingById;
  const service = booking.service;

  const details = [
    { label: 'Confirmation Code', value: shortId },
    { label: 'Service', value: service?.name ?? '' },
    {
      label: 'Date',
      value: formatInTimeZone(booking.startTime, booking.nurse.timezone, 'MMMM d, yyyy'),
    },
    {
      label: 'Time',
      value: formatInTimeZone(booking.startTime, booking.nurse.timezone, 'h:mm a'),
    },
  ];

  return (
    <PageContainer>
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle2 className="size-5 flex-shrink-0" />
        <p>
          Booking confirmed! You'll receive a text with your appointment details. Save this
          confirmation code for your records.
        </p>
      </div>
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
    </PageContainer>
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
