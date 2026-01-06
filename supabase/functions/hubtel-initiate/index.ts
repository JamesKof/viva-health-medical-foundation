import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const hubtelApiId = Deno.env.get("HUBTEL_API_ID");
    const hubtelApiKey = Deno.env.get("HUBTEL_API_KEY");
    const merchantAccountNumber = Deno.env.get("HUBTEL_MERCHANT_ACCOUNT_NUMBER");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!hubtelApiId || !hubtelApiKey || !merchantAccountNumber) {
      console.error("Hubtel credentials not configured");
      return new Response(JSON.stringify({ error: "Payment gateway not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { totalAmount, description, clientReference, email, donorName, phone } = await req.json();

    if (!totalAmount || !email || !clientReference) {
      return new Response(JSON.stringify({ error: "Amount, email, and clientReference are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Initiating Hubtel payment:", { totalAmount, email, clientReference, donorName });

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create pending donation record
    const { error: insertError } = await supabase.from("donations").insert({
      amount: totalAmount,
      email,
      donor_name: donorName || "Anonymous",
      phone: phone || null,
      payment_reference: clientReference,
      payment_status: "pending",
      donation_type: "one-time",
      currency: "GHS",
    });

    if (insertError) {
      console.error("Failed to create pending donation:", insertError);
      return new Response(JSON.stringify({ error: "Failed to initialize donation" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Prepare Hubtel API request
    const callbackUrl = `${supabaseUrl}/functions/v1/hubtel-callback`;
    const returnUrl = "https://vivahealthmedfoundation.org/donate?payment=success";
    const cancellationUrl = "https://vivahealthmedfoundation.org/donate?payment=cancelled";

    const hubtelPayload = {
      totalAmount,
      description: description || "Donation to Viva Health Medical Foundation",
      callbackUrl,
      returnUrl,
      cancellationUrl,
      merchantAccountNumber,
      clientReference,
    };

    console.log("Calling Hubtel API with payload:", hubtelPayload);

    // Log initiate request
    await supabase.from("payment_logs").insert({
      payment_reference: clientReference,
      log_type: "initiate_request",
      request_data: hubtelPayload,
    });

    // Create Basic Auth header
    const authString = btoa(`${hubtelApiId}:${hubtelApiKey}`);

    const hubtelResponse = await fetch("https://payproxyapi.hubtel.com/items/initiate", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${authString}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hubtelPayload),
    });

    const hubtelResult = await hubtelResponse.json();
    console.log("Hubtel API response:", hubtelResult);

    // Log initiate response
    await supabase.from("payment_logs").insert({
      payment_reference: clientReference,
      log_type: "initiate_response",
      response_data: hubtelResult,
      status_code: hubtelResponse.status,
      error_message: hubtelResponse.ok ? null : hubtelResult.message || hubtelResult.description,
    });

    if (!hubtelResponse.ok || hubtelResult.responseCode !== "0000") {
      console.error("Hubtel API error:", hubtelResult);
      
      // Update donation status to failed
      await supabase
        .from("donations")
        .update({ payment_status: "failed" })
        .eq("payment_reference", clientReference);

      return new Response(JSON.stringify({ 
        error: "Failed to initialize payment",
        details: hubtelResult.message || hubtelResult.description 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return checkout URL to frontend
    return new Response(JSON.stringify({
      checkoutUrl: hubtelResult.data?.checkoutUrl,
      checkoutId: hubtelResult.data?.checkoutId,
      clientReference,
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Hubtel initiate error:", error);
    return new Response(JSON.stringify({ error: "Failed to initialize payment" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
