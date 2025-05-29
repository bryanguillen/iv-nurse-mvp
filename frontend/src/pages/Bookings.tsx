import { format as formatDate, addDays, isToday, isTomorrow } from 'date-fns';

import { useGetBookingsQuery } from '@/gql/queries/GetBookings.generated';
import { useAuth } from '@/context/AuthContext';
import { Spinner, PageContainer, BookingCard } from '@/components';

export function Bookings() {
  const { user } = useAuth();
  const nurseId = user?.internalId ?? '';

  // Get today's date and format it for the query
  const today = new Date();
  const startDate = formatDate(today, 'yyyy-MM-dd');
  const endDate = formatDate(addDays(today, 6), 'yyyy-MM-dd');

  const { data, loading } = useGetBookingsQuery({
    variables: {
      input: {
        nurseId,
        start: startDate,
        end: endDate,
      },
    },
  });

  if (loading) return <Spinner />;

  const bookings = data?.getBookings ?? [];

  // Group bookings by date and sort by time
  const bookingsByDate = bookings.reduce((acc: { [key: string]: any[] }, booking) => {
    const date = formatDate(new Date(booking.startTime), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(booking);
    return acc;
  }, {});

  // Sort bookings within each day by startTime
  Object.keys(bookingsByDate).forEach(date => {
    bookingsByDate[date].sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  });

  // Generate array of next 7 days
  const nextSevenDays = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  return (
    <PageContainer>
      <h2 className="text-xl font-semibold mb-6">Upcoming Appointments</h2>
      <div className="space-y-8">
        {nextSevenDays.map(date => {
          const dateKey = formatDate(date, 'yyyy-MM-dd');
          const dayBookings = bookingsByDate[dateKey] ?? [];

          return (
            <div key={dateKey} className="space-y-4">
              <div className="flex items-baseline gap-2">
                <h3 className="text-lg font-medium">{getDayLabel(date)}</h3>
                <span className="text-sm text-muted">{getDateLabel(date)}</span>
              </div>

              {dayBookings.length === 0 ? (
                <p className="text-muted italic">No appointments scheduled</p>
              ) : (
                <div className="space-y-4">
                  {dayBookings.map(booking => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      timezone={user?.timezone ?? 'America/New_York'}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}

function getDayLabel(date: Date): string {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return formatDate(date, 'EEEE');
}

function getDateLabel(date: Date): string {
  return formatDate(date, 'MMMM do');
}
