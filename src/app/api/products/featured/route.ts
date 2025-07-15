import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
export async function GET() {
  try {
    const products = await stripe.products.list({ limit: 100 });
    const prices = await stripe.prices.list({ limit: 100 });

    const featured = products.data
      .filter((p) => p.metadata.featured === "true")
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
          isNew: product.metadata.isNew === "true",
        };
      });
    return NextResponse.json(featured);
  } catch (error) {
    console.error("Featured products error.", error);
    return NextResponse.json(
      { error: "Failed to fetch featured products." },
      { status: 500 }
    );
  }
}
