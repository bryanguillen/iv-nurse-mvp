import { formatInTimeZone } from 'date-fns-tz';
import { format as formatDate } from 'date-fns';
import { Beaker, DollarSign, Repeat, UserPlus } from 'lucide-react';

import { useGetDashboardDataQuery } from '@/gql/queries/GetDashboardData.generated';
import { useAuth } from '@/context/AuthContext';
import { Spinner, PageContainer, ContentContainer, Button, BookingCard } from '@/components';
import { convertUuidToShort } from '@/utils';

export default function Dashboard() {
  const { user } = useAuth();

  const nurseId = user?.internalId ?? '';

  const { data, loading } = useGetDashboardDataQuery({
    variables: {
      bookingsInput: {
        nurseId,
        start: formatDate(new Date(), 'yyyy-MM-dd'),
      },
      nurseIdForStats: nurseId,
    },
  });

  if (loading) return <Spinner />;

  const bookings = data?.getBookings ?? [];
  const stats = data?.getNurseStats?.[0] ?? {
    totalRevenue: 0,
    rebookingsCount: 0,
    rebookingsRevenue: 0,
    newCustomersCount: 0,
    newCustomersRevenue: 0,
  };

  return (
    <PageContainer>
      <h2 className="text-xl font-semibold mb-6">This Month's Stats</h2>
      <div className="grid grid-cols-1 gap-4 mb-8">
        {/* Total Revenue Stat */}
        <ContentContainer>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="size-5 text-primary" />
            <span className="text-sm text-muted">Total Revenue</span>
          </div>
          <span className="text-2xl font-semibold">${stats.totalRevenue.toLocaleString()}</span>
        </ContentContainer>

        <div className="grid grid-cols-2 gap-4">
          {/* Rebookings Stat */}
          <ContentContainer>
            <div className="flex items-center gap-2 mb-2">
              <Repeat className="size-5 text-primary" />
              <span className="text-sm text-muted">Rebookings</span>
            </div>
            <div className="text-2xl font-semibold">{stats.rebookingsCount.toLocaleString()}</div>
            <div className="text-sm text-secondary mt-1">
              ${stats.rebookingsRevenue.toLocaleString()}
            </div>
          </ContentContainer>

          {/* New Customers Stat */}
          <ContentContainer>
            <div className="flex items-center gap-2 mb-2">
              <UserPlus className="size-5 text-primary" />
              <span className="text-sm text-muted">New Customers</span>
            </div>
            <div className="text-2xl font-semibold">{stats.newCustomersCount.toLocaleString()}</div>
            <div className="text-sm text-secondary mt-1">
              ${stats.newCustomersRevenue.toLocaleString()}
            </div>
          </ContentContainer>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-6">Today's Appointments</h2>
      {bookings.length === 0 ? (
        <p className="text-muted">No appointments scheduled for today.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              timezone={user?.timezone ?? 'America/New_York'}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
