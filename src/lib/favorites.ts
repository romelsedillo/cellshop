import { supabase } from "./supabaseClient";
import { stripe } from "./stripe";

export async function getFavorites(userId: string) {
  // 1. Get favorite product IDs from Supabase
  const { data, error } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  const productIds = data?.map((fav) => fav.product_id) ?? [];

  if (productIds.length === 0) {
    return [];
  }

  // 2. For each product ID, fetch from Stripe
  const products = await Promise.all(
    productIds.map(async (id) => {
      try {
        const product = await stripe.products.retrieve(id);
        const priceList = await stripe.prices.list({
          product: id,
          limit: 1,
        });
        const price = priceList.data[0];

        return {
          id: product.id,
          name: product.name,
          image: product.images?.[0] ?? null,
          price: price?.unit_amount ? price.unit_amount / 100 : null,
          currency: price?.currency ?? "usd",
        };
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.warn(
            `Product not found in Stripe: ${id}. Error: ${err.message}`
          );
        } else {
          console.warn(`Product not found in Stripe: ${id}. Unknown error.`);
        }
        return null;
      }
    })
  );

  // Filter out any nulls
  return products.filter((p) => p !== null);
}
