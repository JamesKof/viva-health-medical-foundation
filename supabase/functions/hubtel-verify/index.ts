import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clientReference } = await req.json();

    if (!clientReference) {
      return new Response(JSON.stringify({ error: 'ClientReference is required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Verifying payment for reference:', clientReference);

    // Get Hubtel credentials
    const HUBTEL_API_KEY = Deno.env.get('HUBTEL_API_KEY');
    const HUBTEL_API_ID = Deno.env.get('HUBTEL_API_ID');
    const HUBTEL_MERCHANT_ACCOUNT_NUMBER = Deno.env.get('HUBTEL_MERCHANT_ACCOUNT_NUMBER');

    if (!HUBTEL_API_KEY || !HUBTEL_API_ID || !HUBTEL_MERCHANT_ACCOUNT_NUMBER) {
      console.error('Hubtel credentials not configured');
      return new Response(JSON.stringify({ error: 'Hubtel credentials not configured.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create Basic auth
    const auth = btoa(`${HUBTEL_API_ID}:${HUBTEL_API_KEY}`);

    // Call Hubtel's status check API
    const hubtelUrl = `https://rmsc.hubtel.com/v1/merchantaccount/merchants/${HUBTEL_MERCHANT_ACCOUNT_NUMBER}/transactions/status?clientReference=${clientReference}`;
    
    console.log('Calling Hubtel verify API:', hubtelUrl);

    const response = await fetch(hubtelUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    const hubtelData = await response.json();
    console.log('Hubtel verification response:', JSON.stringify(hubtelData));

    // Log the verification attempt
    await supabase.from('payment_logs').insert({
      payment_reference: clientReference,
      log_type: 'verification',
      response_data: hubtelData,
      status_code: response.status,
    });

    // Check if transaction data is present
    if (hubtelData.ResponseCode !== '0000' || !hubtelData.Data || hubtelData.Data.length === 0) {
      return new Response(JSON.stringify({ 
        status: 'pending', 
        message: 'Transaction not found or is still pending on Hubtel.' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const transaction = hubtelData.Data[0];
    const { TransactionStatus, TransactionId } = transaction;

    // Check if donation exists
    const { data: donation, error: fetchError } = await supabase
      .from('donations')
      .select('*')
      .eq('payment_reference', clientReference)
      .single();

    if (fetchError || !donation) {
      console.error('Payment record not found:', fetchError);
      return new Response(JSON.stringify({ 
        error: 'Payment record not found in database.' 
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (TransactionStatus === 'Success') {
      // Update donation as paid
      const { error: updateError } = await supabase
        .from('donations')
        .update({
          payment_status: 'paid',
          hubtel_invoice_id: TransactionId,
          updated_at: new Date().toISOString(),
        })
        .eq('payment_reference', clientReference);

      if (updateError) {
        console.error('Error updating donation:', updateError);
      }

      console.log('Payment verified as successful');
      return new Response(JSON.stringify({ 
        status: 'success', 
        message: 'Payment verified and updated successfully.',
        transactionId: TransactionId
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else if (TransactionStatus === 'Failed') {
      // Update donation as failed
      const { error: updateError } = await supabase
        .from('donations')
        .update({
          payment_status: 'failed',
          hubtel_invoice_id: TransactionId || '',
          updated_at: new Date().toISOString(),
        })
        .eq('payment_reference', clientReference);

      if (updateError) {
        console.error('Error updating donation:', updateError);
      }

      console.log('Payment verified as failed');
      return new Response(JSON.stringify({ 
        status: 'failed', 
        message: 'Payment failed. Status updated.' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else {
      // Pending, Cancelled, etc.
      console.log('Payment status:', TransactionStatus);
      return new Response(JSON.stringify({ 
        status: 'pending', 
        message: `Payment status is '${TransactionStatus}'.` 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Hubtel verification error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: 'An internal server error occurred.',
      details: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
