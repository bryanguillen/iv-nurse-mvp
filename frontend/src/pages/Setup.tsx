import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle } from '@/components';
import { supabase } from '@/config/supabase';
import { useAuth } from '@/context/AuthContext';
import { useSaveOrganizationRecordMutation } from '@/gql/mutations/SaveOrganizationRecord.generated';
import { useSaveNurseUuidMutation } from '@/gql/mutations/SaveNurseUuid.generated';

export default function Setup() {
  const { user } = useAuth();
  const [form, setForm] = useState({ first_name: '', last_name: '', org_name: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [saveOrganizationRecord] = useSaveOrganizationRecordMutation();
  const [saveNurseUuid] = useSaveNurseUuidMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);
    let orgId = '';

    if (!form.first_name || !form.last_name || !form.org_name) {
      setError('All fields required');
      setIsLoading(false);
      return;
    }

    try {
      // Atomic-like flow
      const result = await createNurseAndOrg({
        nurse_id: user.id,
        first_name: form.first_name,
        last_name: form.last_name,
        org_name: form.org_name,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      orgId = result.org_id ?? '';

      if (!orgId) {
        throw new Error('Organization ID is required');
      }

      // First save the organization record
      const { errors: orgErrors } = await saveOrganizationRecord({
        variables: {
          orgId,
        },
      });

      if (orgErrors) {
        throw new Error(orgErrors[0].message);
      }

      // Then save the nurse UUID
      const { errors: nurseErrors } = await saveNurseUuid({
        variables: {
          nurseId: user.id,
          orgId,
          timezone: 'America/New_York',
        },
      });

      if (nurseErrors) {
        throw new Error(nurseErrors[0].message);
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

async function createNurseAndOrg({
  nurse_id,
  first_name,
  last_name,
  org_name,
}: {
  nurse_id: string;
  first_name: string;
  last_name: string;
  org_name: string;
}) {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_EDGE_FUNCTIONS_URL}/v1/create-nurse-org`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nurse_id,
        first_name,
        last_name,
        org_name,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to create nurse and org');
  }

  return result;
}
