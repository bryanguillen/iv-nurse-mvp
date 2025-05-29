import { formatInTimeZone } from 'date-fns-tz';
import { format as formatDate } from 'date-fns';

import { useGetDashboardDataQuery } from '@/gql/queries/GetDashboardData.generated';
import { useAuth } from '@/context/AuthContext';
import { Spinner, PageContainer, ContentContainer, Button } from '@/components';
import { convertUuidToShort } from '@/utils';

export default function Dashboard() {
  const { user } = useAuth();

  const { data, loading } = useGetDashboardDataQuery({
    variables: {
      input: {
        nurseId: user?.internalId || '',
        start: formatDate(new Date(), 'yyyy-MM-dd'),
      },
    },
  });

  if (loading) return <Spinner />;

  const bookings = data?.getBookings ?? [];

  return (
    <PageContainer>
      <h2 className="text-xl font-semibold mb-6">Today's Appointments</h2>

      {bookings.length === 0 ? (
        <p className="text-muted">No appointments scheduled for today.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <ContentContainer key={booking.id} className="flex flex-col gap-2">
              {/* First row: Time and Client ID */}
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {formatInTimeZone(
                    booking.startTime,
                    user?.timezone ?? 'America/New_York',
                    'h:mm a'
                  )}
                </span>
                <span className="text-sm text-muted">
                  Client #{convertUuidToShort(booking.personId)}
                </span>
              </div>

              {/* Second row: Service and View Details */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">{booking.service.name}</span>
                <Button size="sm">View Details</Button>
              </div>
            </ContentContainer>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
