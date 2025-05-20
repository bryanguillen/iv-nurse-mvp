import { Routes, Route } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';
import { ProtectedLayout } from './components';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Setup from './pages/Setup';
import { Settings } from './pages/settings';
import { BookingLanding, BookingCreate, BookingProvider } from './pages/booking';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/booking/:orgId" element={<BookingProvider />}>
          <Route index element={<BookingLanding />} />
          <Route path="create" element={<BookingCreate />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
