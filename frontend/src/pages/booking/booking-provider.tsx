import { createContext, useContext, useMemo } from 'react';
import { useParams, Outlet } from 'react-router-dom';

import { useGetOrganizationByUuidQuery } from '@/gql/queries/GetOrganizationByUuid.generated';
import { Spinner } from '@/components/ui/spinner';

interface Organization {
  id: string;
  supabaseOrgId: string;
}

interface BookingContextType {
  organization: Organization | null;
  loading: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

export function BookingProvider() {
  const { orgId } = useParams<{ orgId: string }>();

  const { data, loading } = useGetOrganizationByUuidQuery({
    variables: { id: orgId ?? '' },
    skip: !orgId,
  });

  const contextValue = useMemo(
    () => ({
      organization: data?.getOrganizationRecord ?? null,
      loading,
    }),
    [data, loading]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <BookingContext.Provider value={contextValue}>
      <Outlet />
    </BookingContext.Provider>
  );
}
