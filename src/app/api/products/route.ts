import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

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
    return NextResponse.json(enrichedProducts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch Stripe products" },
      { status: 500 }
    );
  }
}

// {
//   id: 'prod_SCX8tmWWhBYuvO',
//   object: 'product',
//   active: true,
//   attributes: [],
//   created: 1745671340,
//   default_price: 'price_1RI83lGaEbCLbjvDt6Xb0Vmg',
//   description: 'The all-new iPad Air features a stunning 13-inch Liquid Retina display and is powered by the Apple M3 chip for exceptional performance. It supports the Apple Pencil Pro, Magic Keyboard, 5G, Wi-Fi 6E, and Touch ID, making it perfect for work, creativity, and entertainment on the go.',
//   images: [Array],
//   livemode: false,
//   marketing_features: [],
//   metadata: [Object],
//   name: 'Apple iPad Air 13 (2025)',
//   package_dimensions: null,
//   shippable: null,
//   statement_descriptor: null,
//   tax_code: null,
//   type: 'service',
//   unit_label: null,
//   updated: 1746151701,
//   url: null
// }
