import { supabase } from '../../config/supabase';
import { useNavigate } from 'react-router-dom';

export default function AppHeader() {
  return (
    <div className="flex justify-end items-center p-4">
      <LogoutButton />
    </div>
  );
}

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); // Optional: go back to login page
  };

  return (
    <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">
      Log Out
    </button>
  );
}
