import { useEffect, useState } from "react";
import { getOrders } from "@/lib/getOrders";
import { useAuthStore } from "@/store/useAuthStore";
import { Order, CartItem } from "@/types/types";

export default function OrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user?.email) {
      getOrders(user.email).then(setOrders);
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
              const cartItems = JSON.parse(order.cart) as CartItem[];
              return (
                <tr key={order.id}>
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.email}</td>
                  <td className="px-4 py-2 border whitespace-pre-wrap">
                    {cartItems
                      .map((item) => `${item.name} (x${item.quantity})`)
                      .join(", ")}
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
