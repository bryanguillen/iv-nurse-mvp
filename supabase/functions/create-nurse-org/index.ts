import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    const { nurse_id, first_name, last_name, org_name } = await req.json();

    if (!nurse_id || !first_name || !last_name || !org_name) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create organization
    const orgId = crypto.randomUUID();

    const { error: orgError } = await supabase.from('organizations').insert({
      id: orgId,
      name: org_name,
      created_by: nurse_id,
    });

    if (orgError) {
      console.error('Org insert error:', orgError);
      return new Response(JSON.stringify({ error: 'Failed to create organization' }), {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Create nurse
    const { error: nurseError } = await supabase.from('nurses').insert({
      id: nurse_id,
      first_name,
      last_name,
      org_id: orgId,
    });

    if (nurseError) {
      console.error('Nurse insert error:', nurseError);
      return new Response(JSON.stringify({ error: 'Failed to create nurse' }), {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    return new Response(JSON.stringify({ success: true, org_id: orgId }), {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
});
