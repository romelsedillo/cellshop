import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const sig = headerList.get("stripe-signature")!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const cart = session.metadata?.cart
      ? JSON.parse(session.metadata.cart)
      : [];

    try {
      const { error } = await supabase.from("orders").insert([
        {
          user_id: session.metadata?.user_id ?? null,
          products: cart, // Make sure your "products" column is type json/jsonb
          stripe_session_id: session.id,
          email: session.metadata?.email ?? null,
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
      } else {
        console.log("✅ Order saved to Supabase");
      }
    } catch (err) {
      console.error("Saving order failed:", err);
    }
  }

  return new NextResponse("Webhook received", { status: 200 });
}
