import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data, error } = await supabase
      .from("donations")
      .select("amount, donation_type, payment_status");

    if (error) {
      console.error("Error fetching donation metrics", error);
      return new Response(JSON.stringify({ error: "Failed to load donation metrics" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const totalDonations = data.length;
    const totalAmount = data.reduce((sum, d) => sum + Number(d.amount || 0), 0);

    const normalise = (value: string | null) => (value || "").toLowerCase();

    const successful = data.filter((d) => {
      const status = normalise(d.payment_status as string | null);
      return status.includes("success") || status === "paid";
    }).length;

    const failed = data.filter((d) => {
      const status = normalise(d.payment_status as string | null);
      return status.includes("fail") || status === "failed";
    }).length;

    const recurringCount = data.filter((d) => {
      const type = normalise(d.donation_type as string | null);
      return type.includes("recurring") || type.includes("subscription");
    }).length;

    const responseBody = {
      totalDonations,
      totalAmount,
      successful,
      failed,
      recurringCount,
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    console.error("Unexpected error in donation-metrics function", err);
    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
