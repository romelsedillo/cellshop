"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/lib/supabaseClient";

type Product = {
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  email: string;
  cart: Product[];
  created_at: string;
};

const OrdersPage = () => {
  const { user } = useAuthStore();

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("email", user.email)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(
          data.map((order: Order) => ({
            ...order,
            cart:
              typeof order.cart === "string"
                ? JSON.parse(order.cart)
                : order.cart,
          }))
        );
      }
    };

    fetchOrders();
  }, [user?.email, supabase]);

  if (!user) return <p>Please log in to see your orders.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-md shadow">
              <p className="text-sm text-gray-500 mb-2">Order ID: {order.id}</p>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Product</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Qty</th>
                    <th className="py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cart.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.name}</td>
                      <td className="py-2">₱{item.price.toFixed(2)}</td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default OrdersPage;
