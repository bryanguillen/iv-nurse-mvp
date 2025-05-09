import { Outlet } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import AppHeader from './AppHeader';

export function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <AppHeader />
      <Outlet />
    </ProtectedRoute>
  );
}
