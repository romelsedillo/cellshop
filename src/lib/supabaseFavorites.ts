import { supabase } from "./supabaseClient";

export async function addFavorite(productId: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in to favorite items.");
  }

  const { error } = await supabase.from("favorites").insert([
    {
      product_id: productId,
      user_id: user.id,
    },
  ]);

  if (error) throw error;
}

export async function removeFavorite(productId: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const { error } = await supabase
    .from("favorites")
    .delete()
    .match({ product_id: productId, user_id: user.id });

  if (error) throw error;
}



export async function getFavoritesForUser(userId: string) {
  const { data, error } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("user_id", userId);

  if (error) throw error;

  return data?.map((fav) => fav.product_id) ?? [];
}

export async function isFavorite(productId: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return false; // Not logged in
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .match({ product_id: productId, user_id: user.id })
    .single();

  if (error && error.code !== "PGRST116") {
    // Not found is fine
    throw error;
  }

  return !!data;
}
