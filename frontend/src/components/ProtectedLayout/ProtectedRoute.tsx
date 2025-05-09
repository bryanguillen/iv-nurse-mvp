import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [checkingSetup, setCheckingSetup] = useState(true);
  const [hasNurseRecord, setHasNurseRecord] = useState<boolean | null>(null);
  const location = useLocation();

  const isOnSetupPage = location.pathname === '/setup';

  useEffect(() => {
    if (!user) return;

    const checkNurse = async () => {
      const { data } = await supabase.from('nurses').select('id').eq('id', user.id).single();

      setHasNurseRecord(!!data);
      setCheckingSetup(false);
    };

    checkNurse();
  }, [user]);

  if (loading || checkingSetup) return <div className="p-4">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!hasNurseRecord && !isOnSetupPage) return <Navigate to="/setup" />;
  if (hasNurseRecord && isOnSetupPage) return <Navigate to="/" />;

  return children;
}
