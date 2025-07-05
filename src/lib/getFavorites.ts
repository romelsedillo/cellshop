export async function getFavorites(userId: string) {
  const { data, error } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("user_id", userId);

  console.log("Supabase favorites query result:", { data, error });

  if (error) {
    throw error;
  }

  const productIds = data?.map((fav) => fav.product_id) ?? [];
  console.log("Mapped product IDs:", productIds);

  if (productIds.length === 0) return [];

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
      } catch (err) {
        console.warn("Stripe error for product ID:", id, err);
        return null;
      }
    })
  );

  console.log("Stripe products fetched:", products);

  return products.filter((p) => p !== null);
}
