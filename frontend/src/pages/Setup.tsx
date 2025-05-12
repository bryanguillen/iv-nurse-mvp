import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabase';

export default function Setup() {
  const { user } = useAuth();
  const [form, setForm] = useState({ first_name: '', last_name: '', org_name: '', timezone: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    if (!form.first_name || !form.last_name || !form.org_name) {
      setError('All fields required');
      return;
    }

    const client = supabase;

    // Atomic-like flow
    const result = await client.rpc('create_nurse_and_org', {
      nurse_id: user.id,
      first_name: form.first_name,
      last_name: form.last_name,
      org_name: form.org_name,
    });

    if (result.error) {
      setError('❌ Something went wrong: ' + result.error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Finish Setting Up Your Account</h1>
      {['first_name', 'last_name', 'org_name'].map(field => (
        <input
          key={field}
          name={field}
          placeholder={field.replace('_', ' ')}
          className="mb-3 block w-full p-2 border rounded"
          value={(form as any)[field]}
          onChange={handleChange}
        />
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Submit
      </button>
      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}
