import { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '@/config/supabase';
import { useGetSelfAsNurseQuery } from '@/gql/queries/GetSelfAsNurse.generated';
import { Spinner } from '@/components';

type AuthContextType = {
  user: any;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Get the nurse's internal ID from GraphQL
  const { data: nurseData, loading: nurseDataLoading } = useGetSelfAsNurseQuery({
    skip: !user?.id, // Skip the query if we don't have a user ID
  });

  useEffect(() => {
    // Get session on load
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser({
          ...data.session.user,
          internalId: nurseData?.getSelfAsNurse?.id,
        });
      }

      setLoading(false);
    });

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          ...session.user,
          internalId: nurseData?.getSelfAsNurse?.id,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [user?.id, nurseData?.getSelfAsNurse?.id]);

  if (loading || nurseDataLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
