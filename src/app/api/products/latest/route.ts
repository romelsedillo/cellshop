import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function GET() {
  try {
    const products = await stripe.products.list({ limit: 100 });
    const prices = await stripe.prices.list({ limit: 100 });

    const latest = products.data
      .filter((p) => p.metadata.latest === "true")
      .map((product) => {
        const price = prices.data.find((p) => p.product === product.id);
        return {
          id: product.id,
          name: product.name,
          image: product.images[0] || "",
          price: price?.unit_amount ? price.unit_amount / 100 : 0,
          description: product.description,
          latest: product.metadata.latest === "true",
          brand: product.metadata.brand,
        };
      });
    return NextResponse.json(latest);
  } catch (error) {
    console.error("Latest products error.", error);
    return NextResponse.json(
      { error: "Failed to fetch latest products." },
      { status: 500 }
    );
  }
}
