// lib/queries.ts
import { supabase } from "@/lib/supabaseClient";
import { Order } from "@/types/types";

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
