import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabase';
import { useSaveSupabaseIdsMutation } from '../gql/mutations/SaveNurseOrgIds.generated';

export default function Setup() {
  const { user } = useAuth();
  const [form, setForm] = useState({ first_name: '', last_name: '', org_name: '', timezone: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [saveSupabaseIds] = useSaveSupabaseIdsMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    let orgId: string | undefined;

    if (!form.first_name || !form.last_name || !form.org_name) {
      setError('All fields required');
      return;
    }

    try {
      // Atomic-like flow
      const result = await supabase.rpc('create_nurse_and_org', {
        nurse_id: user.id,
        first_name: form.first_name,
        last_name: form.last_name,
        org_name: form.org_name,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      orgId = result.data?.org_id;

      const { errors } = await saveSupabaseIds({
        variables: {
          nurseId: user.id,
          orgId: orgId ?? '',
        },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      navigate('/');
    } catch (error) {
      console.error('Setup failed:', error);
      // Rollback Supabase insert
      await supabase.from('nurses').delete().eq('id', user.id);
      if (orgId) {
        await supabase.from('organizations').delete().eq('id', orgId);
      }

      setError('❌ Oops! Something went wrong: ' + error);
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
