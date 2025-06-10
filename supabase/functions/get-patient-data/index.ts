import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Missing or invalid authorization header' }), {
        status: 401,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Extract the JWT token
    const token = authHeader.split(' ')[1];

    // Create Supabase client with service role key for admin operations
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Verify the JWT and get the nurse's user ID
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(JSON.stringify({ error: 'Invalid authentication token' }), {
        status: 401,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Get the nurse ID from the URL
    const url = new URL(req.url);
    const patientId = url.searchParams.get('patientId');
    
    if (!patientId) {
      return new Response(JSON.stringify({ error: 'Missing patientId parameter' }), {
        status: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Verify nurse-patient relationship exists
    const { data: relationship, error: relationshipError } = await supabaseClient
      .from('nurse_patient')
      .select('id')
      .eq('nurse_id', user.id)
      .eq('patient_id', patientId)
      .single();

    if (relationshipError || !relationship) {
      console.error('Relationship check error:', relationshipError);
      return new Response(JSON.stringify({ error: 'Unauthorized access to patient data' }), {
        status: 403,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Fetch patient data with address
    const { data: patient, error: patientError } = await supabaseClient
      .from('patients')
      .select(`
        id,
        first_name,
        last_name,
        phone,
        address_id,
        addresses (
          id,
          line1,
          city,
          state,
          postal_code
        )
      `)
      .eq('id', patientId)
      .single();

    if (patientError || !patient) {
      console.error('Error fetching patient data:', patientError);
      return new Response(JSON.stringify({ error: 'Failed to fetch patient data' }), {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Transform the response to match the desired schema
    const response = {
      id: patient.id,
      firstName: patient.first_name,
      lastName: patient.last_name,
      phone: patient.phone,
      address: patient.addresses ? {
        id: patient.addresses.id,
        line1: patient.addresses.line1,
        city: patient.addresses.city,
        state: patient.addresses.state,
        postalCode: patient.addresses.postal_code
      } : null
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });

  } catch (err) {
    console.error('Unhandled error:', err);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
}); 