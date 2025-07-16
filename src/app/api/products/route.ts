import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await stripe.products.list({ limit: 100 });
    const prices = await stripe.prices.list({ limit: 100 });

    const enrichedProducts = products.data.map((product) => {
      const price = prices.data.find((p) => p.product === product.id);
      return {
        id: product.id,
        name: product.name,
        image: product.images[0] || "",
        price: price?.unit_amount ? price.unit_amount / 100 : 0,
        description: product.description,
        featured: product.metadata.featured === "true",
        brand: product.metadata.brand,
        latest: product.metadata.latest === "true",
      };
    });
    console.log(stripe);
    return NextResponse.json(enrichedProducts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch Stripe products" },
      { status: 500 }
    );
  }
}
