// pages/api/webhook.ts or app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const draftId = session.metadata?.draft_id;
      if (!draftId) throw new Error("Missing draft_id");

      // Fetch draft cart from DB
      const { data: draft, error } = await supabase
        .from("order_drafts")
        .select("*")
        .eq("id", draftId)
        .single();

      if (error || !draft) throw error || new Error("Draft not found");

      // Insert final order into orders table
      await supabase.from("orders").insert({
        user_id: draft.user_id,
        email: draft.email,
        products: draft.cart, // jsonb column
        stripe_session_id: session.id,
        status: "paid",
      });

      // (Optional) Delete draft after conversion
      await supabase.from("order_drafts").delete().eq("id", draftId);
    } catch (err: any) {
      console.error("Webhook processing failed:", err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body
  },
};
