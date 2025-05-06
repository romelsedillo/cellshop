import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function GET() {
  try {
    const products = await stripe.products.list({ limit: 100 });
    const prices = await stripe.prices.list({ limit: 100 });

    const newArrivals = products.data
      .filter((p) => p.metadata.isNew === "true")
      .map((product) => {
        const price = prices.data.find((p) => p.product === product.id);
        return {
          id: product.id,
          name: product.name,
          image: product.images[0] || "",
          price: price?.unit_amount ? price.unit_amount / 100 : 0,
          description: product.description,
          featured: product.metadata.featured === "true",
          brand: product.metadata.brand,
          isNew: true,
        };
      });

    return NextResponse.json(newArrivals);
  } catch (error) {
    console.error("New arrival error:", error);
    return NextResponse.json(
      { error: "Failed to fetch new arrivals" },
      { status: 500 }
    );
  }
}
