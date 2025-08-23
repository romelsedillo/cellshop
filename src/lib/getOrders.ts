// lib/queries.ts
import { supabase } from "@/lib/supabaseClient";
import { Order } from "@/types/types";

export async function getOrders(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId) // filter by user_id instead of email
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error.message);
    return [];
  }

  return data as Order[];
}
