import { useEffect, useState } from 'react';

import { supabase } from '@/config/supabase';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@/components';

type NurseWithOrg = {
  id: any;
  first_name: any;
  last_name: any;
  org_id: any;
  organization: any;
};

export function BasicInfo() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [nurseData, setNurseData] = useState<NurseWithOrg | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchNurseData = async () => {
      const { data, error } = await supabase
        .from('nurses')
        .select(
          `
        id,
        first_name,
        last_name,
        org_id,
        organizations (
          name
        )
      `
        )
        .eq('id', user.id) // replace with your actual nurse UUID
        .single();

      if (error) {
        console.error('Error fetching nurse data:', error);
        return;
      }

      // HACK - For some reason, the organizations data is not being returned as an array,
      // so we need to access it as an object.
      setNurseData({ ...data, organization: (data.organizations as any).name });
      setLoading(false);
    };

    fetchNurseData();
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <BasicInfoSkeleton />
            <BasicInfoSkeleton />
            <BasicInfoSkeleton />
          </div>
        ) : (
          <div className="space-y-4">
            <BasicInfoValue label="First Name" value={nurseData?.first_name} />
            <BasicInfoValue label="Last Name" value={nurseData?.last_name} />
            <BasicInfoValue label="Business Name" value={nurseData?.organization} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BasicInfoSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

function BasicInfoValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-muted">{label}</label>
      <p className="font-medium">{value}</p>
    </div>
  );
}
