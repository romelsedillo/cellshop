import React from "react";

const mockOrders = [
  {
    id: "ORD-1001",
    date: "2025-06-01",
    total: 86990,
    status: "Shipped",
  },
  {
    id: "ORD-1002",
    date: "2025-05-20",
    total: 14990,
    status: "Delivered",
  },
];

const OrdersPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>

      {mockOrders.length > 0 ? (
        <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">₱{order.total.toLocaleString()}</td>
                  <td className="py-3 px-4 text-pink-600 font-medium">
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border border-dashed border-pink-300 rounded-lg p-6 text-center text-gray-500 bg-white">
          You have no orders yet.
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
