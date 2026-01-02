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
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await req.json();
    console.log("Hubtel callback received:", JSON.stringify(data, null, 2));

    // Extract data from Hubtel callback
    const responseCode = data.ResponseCode || data.responseCode;
    const responseData = data.Data || data.data || {};
    const clientReference = responseData.ClientReference || responseData.clientReference;
    const status = responseData.Status || responseData.status;
    const salesInvoiceId = responseData.SalesInvoiceId || responseData.salesInvoiceId;
    const amount = responseData.Amount || responseData.amount;

    if (!clientReference) {
      console.error("ClientReference not found in Hubtel callback data");
      return new Response(JSON.stringify({ error: "ClientReference missing" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Processing payment:", { clientReference, responseCode, status, amount });

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if payment was successful
    if (responseCode === "0000" && status === "Success") {
      console.log(`Payment successful for ${clientReference}, Amount: ${amount}, Invoice ID: ${salesInvoiceId}`);

      // Update donation status to paid
      const { error: updateError } = await supabase
        .from("donations")
        .update({
          payment_status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("payment_reference", clientReference);

      if (updateError) {
        console.error("Failed to update donation status:", updateError);
        return new Response(JSON.stringify({ error: "Failed to update donation" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log(`Donation ${clientReference} marked as paid`);
    } else {
      console.log(`Payment failed for ${clientReference}: ${status}`);

      // Update donation status to failed
      const { error: updateError } = await supabase
        .from("donations")
        .update({
          payment_status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("payment_reference", clientReference);

      if (updateError) {
        console.error("Failed to update donation status:", updateError);
      }
    }

    // Return success response to Hubtel
    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Hubtel callback error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
