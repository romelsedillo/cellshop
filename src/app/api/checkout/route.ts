import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

type CartItem = {
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export async function POST(req: Request) {
  console.log("🔔 Checkout route hit");

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("❌ Stripe secret key is missing");
    throw new Error("Stripe secret key not loaded");
  }

  const body = await req.json();
  console.log("🧾 Received cartItems:", body.cartItems);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      line_items: body.cartItems.map((item: CartItem) => ({
        price_data: {
          currency: "php",
          product_data: {
            name: item.name,
            images: item.image
              ? [item.image]
              : ["https://via.placeholder.com/150"],
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity,
      })),
    });

    console.log("✅ Stripe session created:", session.id);
    return NextResponse.json({ id: session.id });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred.";
    console.error("🔥 Stripe session error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
