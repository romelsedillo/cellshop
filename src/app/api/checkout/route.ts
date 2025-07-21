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
  try {
    const {
      cartItems,
      user,
    }: { cartItems: CartItem[]; user: { id: string; email: string } } =
      await req.json();

    // console.log("✅ cartItems:", cartItems);
    // console.log("✅ STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
    // console.log("✅ NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: "No cart items provided" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      // success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      // cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      success_url: `https://pickcellshop.vercel.app/success`,
      cancel_url: `https://pickcellshop.vercel.app/checkout`,
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "php",
          product_data: {
            name: item.name || "Unnamed Product",
            images: item.image?.startsWith("http") ? [item.image] : [],
          },
          unit_amount: item.price ? Math.round(item.price * 100) : 1000,
        },
        quantity: item.quantity || 1,
      })),
      metadata: {
        user_id: user?.id || "guest",
        email: user?.email || "no-email",
        cart: JSON.stringify(cartItems),
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("🔥 Stripe session error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
