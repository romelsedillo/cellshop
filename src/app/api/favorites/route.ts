// /src/app/api/favorites/route.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function GET() {
  const cookieStore = cookies(); // This is correct in latest Next.js, no await needed

  // Create Supabase client with cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Fetch user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // Get favorites for this user
  const { data: favoritesData, error: favoritesError } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("user_id", user.id);

  if (favoritesError) {
    console.error("Error fetching favorites:", favoritesError);
    return new Response(JSON.stringify({ error: "Failed to load favorites" }), {
      status: 500,
    });
  }

  const productIds = favoritesData?.map((f) => f.product_id) ?? [];
  if (productIds.length === 0) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  // Fetch product details from Stripe
  const products = await Promise.all(
    productIds.map(async (id) => {
      const product = await stripe.products.retrieve(id);
      const prices = await stripe.prices.list({ product: id, limit: 1 });
      const price = prices.data[0];

      return {
        id: product.id,
        name: product.name,
        image: product.images[0] ?? null,
        price: price ? price.unit_amount / 100 : null,
        currency: price?.currency ?? "usd",
      };
    })
  );

  return new Response(JSON.stringify(products), { status: 200 });
}
