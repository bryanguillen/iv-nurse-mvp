import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  if (req.method === 'OPTIONS' || req.method === 'POST') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const { firstName, phone, address } = await req.json();

    if (!firstName || !phone || !address) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    // Fetch up to 1000 users (adjust as needed)
    const { data: userList, error: listError } = await supabaseClient.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (listError) {
      console.error('Error listing users:', listError);
      return new Response(JSON.stringify({ error: 'User lookup failed' }), { status: 500 });
    }

    // Find matching user by phone
    const matchingUser = userList.users.find(user => user.phone === phone);

    let userId = matchingUser?.id;

    if (userId) {
      console.log(`User with phone ${phone} already exists, id: ${userId}`);
    } else {
      // Create new user if not found
      const { data: newUser, error: userError } = await supabaseClient.auth.admin.createUser({
        phone,
      });

      if (userError || !newUser) {
        console.error('Error creating user:', userError);
        return new Response(JSON.stringify({ error: 'User creation failed' }), { status: 500 });
      }

      userId = newUser.user?.id ?? '';
      console.log(`Created new user with id: ${userId}`);
    }

    // Insert address
    const { data: addressRow, error: addressError } = await supabaseClient
      .from('addresses')
      .insert([address])
      .select('id')
      .single();

    if (addressError || !addressRow) {
      console.error('Error inserting address:', addressError);
      return new Response(JSON.stringify({ error: 'Address creation failed' }), { status: 500 });
    }

    const addressId = addressRow.id;

    // Insert patient
    const { error: patientError } = await supabaseClient.from('patients').insert([
      {
        id: userId,
        first_name: firstName,
        phone,
        address_id: addressId,
      },
    ]);

    if (patientError) {
      console.error('Error inserting patient:', patientError);
      return new Response(JSON.stringify({ error: 'Patient creation failed' }), { status: 500 });
    }

    return new Response(JSON.stringify({ patientId: userId, newUser: !matchingUser }), { status: 200 });
  } catch (err) {
    console.error('Unhandled error:', err);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
