import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-paystack-signature",
};

// Verify Paystack webhook signature
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hash = createHmac("sha512", secret).update(payload).digest("hex");
  return hash === signature;
}

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
    const paystackSecret = Deno.env.get("PAYSTACK_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!paystackSecret) {
      console.error("PAYSTACK_SECRET_KEY not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    // Verify webhook signature
    if (!signature || !verifySignature(payload, signature, paystackSecret)) {
      console.error("Invalid webhook signature");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const event = JSON.parse(payload);
    console.log("Received Paystack webhook event:", event.event);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    switch (event.event) {
      case "charge.success": {
        // Handle successful one-time payment or subscription charge
        const data = event.data;
        const metadata = data.metadata?.custom_fields || [];
        
        const donorName = metadata.find((f: any) => f.variable_name === "donor_name")?.value || "Anonymous";
        const donationType = metadata.find((f: any) => f.variable_name === "donation_type")?.value || "one-time";
        const phone = metadata.find((f: any) => f.variable_name === "phone")?.value || null;

        console.log("Processing charge.success:", {
          reference: data.reference,
          amount: data.amount / 100,
          email: data.customer?.email,
          donorName,
          donationType,
        });

        const { error: insertError } = await supabase.from("donations").insert({
          email: data.customer?.email || "unknown@email.com",
          amount: data.amount / 100, // Convert from kobo/pesewas to main currency
          payment_reference: data.reference,
          payment_status: "successful",
          donor_name: donorName,
          donation_type: donationType,
          phone: phone,
          currency: data.currency || "GHS",
          subscription_code: data.plan?.plan_code || null,
        });

        if (insertError) {
          console.error("Error inserting donation:", insertError);
        } else {
          console.log("Donation recorded successfully");
        }
        break;
      }

      case "subscription.create": {
        // Handle new subscription creation
        const data = event.data;
        console.log("New subscription created:", {
          subscriptionCode: data.subscription_code,
          email: data.customer?.email,
          plan: data.plan?.name,
        });
        
        // We can track subscription separately or just wait for charge.success events
        break;
      }

      case "subscription.not_renew": {
        // Handle subscription cancellation
        const data = event.data;
        console.log("Subscription cancelled:", {
          subscriptionCode: data.subscription_code,
          email: data.customer?.email,
        });

        // Update any existing donation records with this subscription
        const { error: updateError } = await supabase
          .from("donations")
          .update({ payment_status: "cancelled" })
          .eq("subscription_code", data.subscription_code);

        if (updateError) {
          console.error("Error updating cancelled subscription:", updateError);
        }
        break;
      }

      case "subscription.disable": {
        // Handle disabled subscription
        const data = event.data;
        console.log("Subscription disabled:", {
          subscriptionCode: data.subscription_code,
        });
        break;
      }

      case "invoice.payment_failed": {
        // Handle failed subscription payment
        const data = event.data;
        console.log("Invoice payment failed:", {
          reference: data.reference,
          email: data.customer?.email,
        });
        break;
      }

      case "transfer.success": {
        console.log("Transfer successful:", event.data);
        break;
      }

      case "transfer.failed": {
        console.log("Transfer failed:", event.data);
        break;
      }

      default:
        console.log("Unhandled event type:", event.event);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(JSON.stringify({ error: "Webhook processing failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
