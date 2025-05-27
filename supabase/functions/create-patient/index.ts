import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const { firstName, phone, address } = await req.json();

    if (!firstName || !phone || !address) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    // Check if user exists
    const { data: existingUser } = await supabaseClient.auth.admin.listUsers({
      page: 1,
      perPage: 1,
      phone,
    });

    let userId = existingUser?.users?.[0]?.id;

    // Create user if not exists
    if (!userId) {
      const { data: newUser, error: userError } =
        await supabaseClient.auth.admin.createUser({
          phone,
        });

      if (userError || !newUser) {
        console.error('Error creating user:', userError);
        return new Response(JSON.stringify({ error: 'User creation failed' }), { status: 500 });
      }

      userId = newUser.id;
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

    return new Response(JSON.stringify({ patientId: userId }), { status: 200 });
  } catch (err) {
    console.error('Unhandled error:', err);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
