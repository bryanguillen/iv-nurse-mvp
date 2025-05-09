import { Routes, Route } from 'react-router-dom';

import { ProtectedLayout } from './components/ProtectedLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Setup from './pages/Setup';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/setup" element={<Setup />} />
      </Route>
    </Routes>
  );
}
