import { useGetNurseDataQuery } from '@/gql/queries/GetNurseSettingsData.generated';
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@/components';
import { useAuth } from '@/context/AuthContext';

const DAYS_OF_WEEK = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 0, label: 'Sunday' },
];

export function AvailabilityServicesInfo() {
  const { user } = useAuth();
  const { data, loading } = useGetNurseDataQuery({
    variables: { nurseId: user?.internalId ?? '' },
    skip: !user?.internalId,
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="space-y-4">
              {DAYS_OF_WEEK.map(day => (
                <Skeleton key={day.value} className="h-4 w-full" />
              ))}
            </div>
          )}
          {!loading && (
            <div className="space-y-4">
              {DAYS_OF_WEEK.map(day => {
                const availabilities =
                  data?.getAvailabilityByNurseId.filter(a => a.dayOfWeek === day.value) ?? [];

                return (
                  <div key={day.value} className="flex items-start justify-between">
                    <span className="text-sm">{day.label}</span>
                    <div className="text-sm text-muted space-y-1 text-right">
                      {availabilities.length > 0 ? (
                        availabilities.map(availability => (
                          <div key={availability.id}>
                            {availability.startTime} - {availability.endTime}
                          </div>
                        ))
                      ) : (
                        <span>Closed</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          )}
          {!loading && (
            <div className="space-y-4">
              {data?.getNurseServicesByNurseId.map(service => (
                <div key={service.id} className="space-y-1">
                  <div className="text-sm font-medium">{service.name}</div>
                  <div className="flex justify-between text-xs text-muted">
                    <span>Duration: {service.durationMinutes} minutes</span>
                    <span>${service.price?.toFixed(2) ?? '0.00'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
