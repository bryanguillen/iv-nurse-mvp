import { formatInTimeZone } from 'date-fns-tz';
import { Beaker } from 'lucide-react';

import { convertUuidToShort } from '@/utils';
import { ContentContainer } from './ui/content-container';
import { BookingCardViewDetails } from './booking-card-view-details';

export function BookingCard({ booking, timezone }: { booking: any; timezone: string }) {
  return (
    <ContentContainer key={booking.id} className="flex flex-col gap-2">
      {/* First row: Time and Client ID */}
      <div className="flex justify-between items-center">
        <span className="font-medium">
          {formatInTimeZone(booking.startTime, timezone, 'h:mm a')}
        </span>
        <span className="text-sm text-muted">
          Client #{convertUuidToShort(booking.person.supabaseId)}
        </span>
      </div>

      {/* Second row: Service and View Details */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Beaker className="size-4 text-primary" />
          <span className="text-sm text-muted">{booking.service.name}</span>
        </div>
        <BookingCardViewDetails patientId={booking.person.supabaseId} />
      </div>
    </ContentContainer>
  );
}
