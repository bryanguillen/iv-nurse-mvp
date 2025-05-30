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
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    const { id, bookingCode } = await req.json();

    if (!id || !bookingCode) {
      return new Response(JSON.stringify({ error: 'Missing id or code' }), { status: 400 });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch patient
    const { data: patient, error: dbError } = await supabase
      .from('patients')
      .select('id, phone')
      .eq('id', id)
      .single();

      
    if (dbError || !patient) {
      console.log('patient', patient);
      console.log('dbError', dbError);
      return new Response(JSON.stringify({ error: 'Patient not found' }), { status: 404 });
    }

    const phoneNumber = patient.phone;

    // Prepare Twilio API request
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')!;
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')!;
    const fromNumber = Deno.env.get('TWILIO_FROM_NUMBER')!;
    
    const confirmationLink = Deno.env.get('SELF_CONFIRMATION_LINK')!;
    const message = `Your booking is confirmed! Please view ${confirmationLink}/booking/${bookingCode}`;
    
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const body = new URLSearchParams({
      From: fromNumber,
      To: phoneNumber,
      Body: message,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${accountSid}:${authToken}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Twilio API error:', errorBody);
      return new Response(JSON.stringify({ error: 'Failed to send SMS' }), { status: 500 });
    }

    const responseData = await response.json();
    console.log('Twilio API response:', responseData);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
});
