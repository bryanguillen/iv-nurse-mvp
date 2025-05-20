import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle } from '@/components';

import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabase';
import { useSaveSupabaseIdsMutation } from '../gql/mutations/SaveNurseOrgIds.generated';

export default function Setup() {
  const { user } = useAuth();
  const [form, setForm] = useState({ first_name: '', last_name: '', org_name: '', timezone: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [saveSupabaseIds] = useSaveSupabaseIdsMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);
    let orgId: string | undefined;

    if (!form.first_name || !form.last_name || !form.org_name) {
      setError('All fields required');
      setIsLoading(false);
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
          timezone: 'America/New_York',
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card">
        <CardHeader>
          <CardTitle className="text-center">Finish Setting Up Your Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {[
              { name: 'first_name', label: 'First Name' },
              { name: 'last_name', label: 'Last Name' },
              { name: 'org_name', label: 'Organization Name' },
            ].map(({ name, label }) => (
              <div key={name} className="space-y-2">
                <Label htmlFor={name}>{label}</Label>
                <Input
                  id={name}
                  name={name}
                  value={(form as any)[name]}
                  onChange={handleChange}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  disabled={isLoading}
                />
              </div>
            ))}
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Setting up...' : 'Submit'}
          </Button>

          {error && <p className="text-destructive text-sm text-center">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
