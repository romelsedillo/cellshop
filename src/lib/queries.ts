import { supabase } from "./supabaseClient";

export async function getFavoriteIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("user_id", userId);

  if (error) throw error;
  return data?.map((fav) => fav.product_id) ?? [];
}
