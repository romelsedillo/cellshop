import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

type CartItem = {
  name: string;
  image: string;
  price: number;
  quantity: number;
};
export async function POST(req: Request) {
  const { cartItems }: { cartItems: CartItem[] } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      line_items: cartItems.map((item: CartItem) => ({
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
    return NextResponse.json({ id: session.id });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred.";
    console.error("Stripe session error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
