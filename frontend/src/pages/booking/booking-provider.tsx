import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { toast } from 'sonner';

import { useGetNurseDataForBookingFlowQuery } from '@/gql/queries/GetNurseDataForBookingFlow.generated';
import { Spinner } from '@/components/ui/spinner';
import { supabase } from '@/config/supabase';

interface BookingDataContextType {
  organization: {
    id: string;
    name: string;
  };
  nurse: {
    id: string;
    supabaseId: string;
    timezone: string;
    services: {
      id: string;
      name: string;
      description: string;
      price: number;
      durationMinutes: number;
      topPick: boolean;
    }[];
  };
}

const BookingContext = createContext<BookingDataContextType | undefined>(undefined);

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

export function BookingProvider() {
  const { nurseId } = useParams<{ nurseId: string }>();
  const [supabaseOrg, setSupabaseOrg] = useState<{ id: string; name: string } | null>(null);

  const { data, loading, error } = useGetNurseDataForBookingFlowQuery({
    variables: { nurseId: nurseId ?? '' },
    skip: !nurseId,
    onError: () => {
      toast.error(
        'Oops, looks like there was an error when loading from our app. Please try again. If it persists, reach out to our team.'
      );
    },
  });

  // Fetch organization from Supabase once we have the supabaseOrgId
  useEffect(() => {
    if (!data?.getNurseById?.organization?.id) return;

    const fetchSupabaseOrg = async () => {
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('id, name')
        .eq('id', data.getNurseById?.organization?.id)
        .single();

      if (orgError) {
        toast.error('Failed to load organization details. Please try again.');
        return;
      }

      setSupabaseOrg(orgData);
    };

    fetchSupabaseOrg();
  }, [data?.getNurseById?.organization?.id, setSupabaseOrg]);

  const contextValue: BookingDataContextType | undefined | null = useMemo(
    () =>
      data?.getNurseById &&
      supabaseOrg && {
        organization: {
          id: data.getNurseById.organization.id,
          name: supabaseOrg?.name,
        },
        nurse: {
          id: data.getNurseById.id,
          timezone: data.getNurseById.timezone,
          supabaseId: data.getNurseById.supabaseId,
          services: data.getNurseById.services.map(service => ({
            id: service.id,
            name: service.name,
            description: service.description ?? '',
            price: service.price ?? 0,
            durationMinutes: service.durationMinutes ?? 0,
            topPick: service.topPick ?? false,
          })),
        },
      },
    [data, supabaseOrg]
  );

  if (loading || error || !contextValue) {
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
