import { Routes, Route } from 'react-router-dom';

import { ProtectedLayout } from './components';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Setup from './pages/Setup';
import { Settings } from './pages/settings';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
