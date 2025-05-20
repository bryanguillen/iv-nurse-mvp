import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/config/supabase';
import { Spinner } from '@/components/ui/spinner';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading: userLoading } = useAuth();
  const [checkingSetup, setCheckingSetup] = useState(true);
  const [hasNurseRecord, setHasNurseRecord] = useState<boolean | null>(null);
  const location = useLocation();

  const isOnSetupPage = location.pathname === '/setup';

  /**
   * Check if the nurse has a record in the database
   * with a HACK for the case when the user initially signs up.
   *
   * HACK - Notice the check for location and hasNurseRecord,
   * this is useful for the case where the user is in setup
   * and successfully creates their account, but the page
   * refreshes and the user is no longer in setup. Without this,
   * they go back to setup since this component is not aware of
   * the state update.
   */
  useEffect(() => {
    if (!user || hasNurseRecord) return;

    const checkNurse = async () => {
      const { data } = await supabase.from('nurses').select('id').eq('id', user.id).single();

      setHasNurseRecord(!!data);
      setCheckingSetup(false);
    };

    checkNurse();
  }, [user, location.pathname, hasNurseRecord]);

  const isAttemptingToLoadUser = userLoading && !user;
  const isAttemptingToLoadNurseRecord = checkingSetup && user;

  if (isAttemptingToLoadUser || isAttemptingToLoadNurseRecord) return <Spinner />;
  if (!user) return <Navigate to="/login" />;
  if (!hasNurseRecord && !isOnSetupPage) return <Navigate to="/setup" />;
  if (hasNurseRecord && isOnSetupPage) return <Navigate to="/" />;

  return children;
}
