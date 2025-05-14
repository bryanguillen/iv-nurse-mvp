import { Outlet } from 'react-router-dom';

import { SidebarProvider, SidebarTrigger, AppSidebar } from '@/components';

import { ProtectedRoute } from './ProtectedRoute';

export function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
