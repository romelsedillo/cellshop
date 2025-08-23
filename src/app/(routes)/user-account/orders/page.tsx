"use client";
import { useEffect, useState } from "react";
import { getOrders } from "@/lib/getOrders";
import { useAuthStore } from "@/store/useAuthStore";

// Minimal inline type for products
type ProductItem = {
  name?: string;
  quantity?: number;
};

export type Order = {
  id: string;
  email: string;
  products: unknown; // products could be string or already an array
  created_at: string;
  status: string;
};

export default function OrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user?.id) {
      getOrders(user.id).then(setOrders);
    }
  }, [user]);

  const parseProducts = (products: unknown): ProductItem[] => {
    if (Array.isArray(products)) {
      return products as ProductItem[];
    }
    if (typeof products === "string") {
      try {
        const parsed = JSON.parse(products);
        return Array.isArray(parsed) ? (parsed as ProductItem[]) : [];
      } catch {
        console.error("Invalid products JSON:", products);
        return [];
      }
    }
    return [];
  };

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
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const cartProducts = parseProducts(order.products);

              return (
                <tr key={order.id}>
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.email}</td>
                  <td className="px-4 py-2 border">
                    {cartProducts.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {cartProducts.map((item, index) => (
                          <li key={index}>
                            {item?.name ?? "Unknown"} (x{item?.quantity ?? 0})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No items</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">{order.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
