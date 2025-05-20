import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { toast } from 'sonner';

import { useGetOrganizationByUuidQuery } from '@/gql/queries/GetOrganizationByUuid.generated';
import { Spinner } from '@/components/ui/spinner';
import { supabase } from '@/config/supabase';

interface OrganizationContextType {
  id: string;
  supabaseOrgId: string;
  name: string;
}

const BookingContext = createContext<OrganizationContextType | undefined>(undefined);

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

export function BookingProvider() {
  const { orgId } = useParams<{ orgId: string }>();
  const [supabaseOrg, setSupabaseOrg] = useState<{ id: string; name: string } | null>(null);

  const { data, loading, error } = useGetOrganizationByUuidQuery({
    variables: { id: orgId ?? '' },
    skip: !orgId,
    onError: () => {
      toast.error(
        'Oops, looks like there was an error when loading from our app. Please try again. If it persists, reach out to our team.'
      );
    },
  });

  // Fetch organization from Supabase once we have the supabaseOrgId
  useEffect(() => {
    if (!data?.getOrganizationRecord?.supabaseOrgId) return;

    const fetchSupabaseOrg = async () => {
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('id, name')
        .eq('id', data.getOrganizationRecord.supabaseOrgId)
        .single();

      if (orgError) {
        toast.error('Failed to load organization details. Please try again.');
        return;
      }

      setSupabaseOrg(orgData);
    };

    fetchSupabaseOrg();
  }, [data?.getOrganizationRecord?.supabaseOrgId, setSupabaseOrg]);

  const contextValue = useMemo(
    () =>
      data?.getOrganizationRecord &&
      supabaseOrg && {
        id: data?.getOrganizationRecord.id,
        supabaseOrgId: data?.getOrganizationRecord.supabaseOrgId,
        name: supabaseOrg.name,
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
