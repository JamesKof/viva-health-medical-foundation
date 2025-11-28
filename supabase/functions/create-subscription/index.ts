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
    const paystackSecret = Deno.env.get("PAYSTACK_SECRET_KEY");
    
    if (!paystackSecret) {
      console.error("PAYSTACK_SECRET_KEY not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { email, amount, name, phone, interval = "monthly" } = await req.json();

    if (!email || !amount) {
      return new Response(JSON.stringify({ error: "Email and amount are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // First, create or get a plan for this amount
    const planName = `Monthly Donation - GHS ${amount}`;
    const planCode = `viva_monthly_${amount}`;

    // Check if plan exists, if not create it
    let plan;
    try {
      const checkPlanResponse = await fetch(`https://api.paystack.co/plan/${planCode}`, {
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
        },
      });

      if (checkPlanResponse.ok) {
        const planData = await checkPlanResponse.json();
        if (planData.status && planData.data) {
          plan = planData.data;
          console.log("Found existing plan:", plan.plan_code);
        }
      }
    } catch (e) {
      console.log("Plan not found, will create new one");
    }

    // Create plan if it doesn't exist
    if (!plan) {
      console.log("Creating new plan for amount:", amount);
      const createPlanResponse = await fetch("https://api.paystack.co/plan", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: planName,
          interval: interval,
          amount: amount * 100, // Convert to pesewas
          currency: "GHS",
        }),
      });

      const planResult = await createPlanResponse.json();
      console.log("Plan creation result:", planResult);

      if (!planResult.status) {
        // If plan creation failed due to duplicate, try to fetch it
        if (planResult.message?.includes("already exists")) {
          const fetchPlanResponse = await fetch("https://api.paystack.co/plan", {
            headers: {
              Authorization: `Bearer ${paystackSecret}`,
            },
          });
          const allPlans = await fetchPlanResponse.json();
          plan = allPlans.data?.find((p: any) => p.amount === amount * 100 && p.interval === interval);
        }
        
        if (!plan) {
          return new Response(JSON.stringify({ error: "Failed to create subscription plan", details: planResult }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      } else {
        plan = planResult.data;
      }
    }

    // Initialize transaction with the plan
    const reference = `viva_sub_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    
    const transactionResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100,
        currency: "GHS",
        reference,
        plan: plan.plan_code,
        metadata: {
          custom_fields: [
            {
              display_name: "Donor Name",
              variable_name: "donor_name",
              value: name || "Anonymous",
            },
            {
              display_name: "Donation Type",
              variable_name: "donation_type",
              value: "recurring",
            },
            {
              display_name: "Phone Number",
              variable_name: "phone",
              value: phone || "",
            },
          ],
        },
      }),
    });

    const transactionResult = await transactionResponse.json();
    console.log("Transaction initialization result:", transactionResult);

    if (!transactionResult.status) {
      return new Response(JSON.stringify({ error: "Failed to initialize subscription", details: transactionResult }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      authorization_url: transactionResult.data.authorization_url,
      access_code: transactionResult.data.access_code,
      reference: transactionResult.data.reference,
      plan_code: plan.plan_code,
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Subscription creation error:", error);
    return new Response(JSON.stringify({ error: "Failed to create subscription" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
