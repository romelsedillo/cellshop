"use client";
import { useEffect, useState } from "react";
import { getOrders } from "@/lib/getOrders";
import { useAuthStore } from "@/store/useAuthStore";
import { CartItem } from "@/types/types";

export type Order = {
  id: string;
  email: string;
  products: string;
  created_at: string;
};

export default function OrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user?.id) {
      getOrders(user.id).then(setOrders);
    }
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Cart Items</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              let cartProducts: CartItem[] = [];
              try {
                cartProducts = JSON.parse(order.products);
              } catch (e) {
                console.error("Invalid products JSON:", order.products);
                console.error("error:", e);
              }

              return (
                <tr key={order.id}>
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.email}</td>
                  <td className="px-4 py-2 border">
                    <ul className="list-disc list-inside space-y-1">
                      {cartProducts.map((item, index) => (
                        <li key={index}>
                          {item.name} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
