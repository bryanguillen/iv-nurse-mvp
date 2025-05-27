import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
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
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    let newUser = false;
    let newPatient = false;
    let addressUpdated = false;

    // Fetch up to 1000 users
    const { data: userList, error: listError } = await supabaseClient.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (listError) {
      console.error('Error listing users:', listError);
      return new Response(JSON.stringify({ error: 'User lookup failed' }), {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    const matchingUser = userList.users.find((user) => user.phone === phone);
    let userId = matchingUser?.id;

    if (!userId) {
      const { data: newUserData, error: userError } =
        await supabaseClient.auth.admin.createUser({ phone });

      if (userError || !newUserData?.user?.id) {
        console.error('Error creating user:', userError);
        return new Response(JSON.stringify({ error: 'User creation failed' }), {
          status: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
      }

      userId = newUserData.user.id;
      newUser = true;
      console.log(`Created new auth user with id: ${userId}`);
    }

    // Check for existing patient
    const { data: patient, error: patientError } = await supabaseClient
      .from('patients')
      .select('id, address_id')
      .eq('id', userId)
      .single();

    let addressId;

    if (patientError && patientError.code !== 'PGRST116') {
      console.error('Error fetching patient:', patientError);
      return new Response(JSON.stringify({ error: 'Patient lookup failed' }), {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    if (!patient) {
      // Insert new address
      const { data: addressRow, error: addressError } = await supabaseClient
        .from('addresses')
        .insert([address])
        .select('id')
        .single();

      if (addressError || !addressRow) {
        console.error('Error inserting address:', addressError);
        return new Response(JSON.stringify({ error: 'Address creation failed' }), {
          status: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
      }

      addressId = addressRow.id;

      const { error: insertPatientError } = await supabaseClient.from('patients').insert([
        {
          id: userId,
          first_name: firstName,
          phone,
          address_id: addressId,
        },
      ]);

      if (insertPatientError) {
        console.error('Error inserting patient:', insertPatientError);
        return new Response(JSON.stringify({ error: 'Patient creation failed' }), {
          status: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
      }

      newPatient = true;
      console.log(`Created new patient with id: ${userId}`);
    } else {
      // Existing patient — check address
      const { data: existingAddress, error: existingAddressError } = await supabaseClient
        .from('addresses')
        .select('*')
        .eq('id', patient.address_id)
        .single();

      if (existingAddressError || !existingAddress) {
        console.error('Error fetching existing address:', existingAddressError);
        return new Response(JSON.stringify({ error: 'Existing address lookup failed' }), {
          status: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
      }

      const isSameAddress =
        existingAddress.line1 === address.line1

      if (!isSameAddress) {
        // Insert into patient_address_history
        const { error: historyError } = await supabaseClient
          .from('patient_address_history')
          .insert([
            {
              patient_id: userId,
              address_id: existingAddress.id,
              changed_at: new Date().toISOString(),
            },
          ]);

        if (historyError) {
          console.error('Error inserting address history:', historyError);
          return new Response(JSON.stringify({ error: 'Address history log failed' }), {
            status: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
          });
        }

        // Insert new address
        const { data: newAddressRow, error: newAddressError } = await supabaseClient
          .from('addresses')
          .insert([address])
          .select('id')
          .single();

        if (newAddressError || !newAddressRow) {
          console.error('Error inserting new address:', newAddressError);
          return new Response(JSON.stringify({ error: 'New address creation failed' }), {
            status: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
          });
        }

        addressId = newAddressRow.id;

        // Update patient address_id
        const { error: updatePatientError } = await supabaseClient
          .from('patients')
          .update({ address_id: addressId })
          .eq('id', userId);

        if (updatePatientError) {
          console.error('Error updating patient address:', updatePatientError);
          return new Response(JSON.stringify({ error: 'Patient address update failed' }), {
            status: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
          });
        }

        addressUpdated = true;
        console.log(`Updated patient ${userId} with new address ${addressId}`);
      } else {
        addressId = existingAddress.id;
        console.log('Address unchanged; no update needed.');
      }
    }

    return new Response(
      JSON.stringify({
        patientId: userId,
        newUser,
        newPatient,
        addressUpdated,
      })
    );
  } catch (err) {
    console.error('Unhandled error:', err);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
});
