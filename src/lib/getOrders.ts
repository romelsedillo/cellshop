// lib/queries.ts
import { supabase } from "@/lib/supabaseClient";
export type Order = {
  id: string;
  email: string;
  products: string;
  created_at: string;
};

export async function getOrders(email: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error.message);
    return [];
  }

  return data as Order[];
}
