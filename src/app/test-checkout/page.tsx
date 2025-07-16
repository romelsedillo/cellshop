"use client";

import { useState, useEffect } from "react";

export default function TestCheckout() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const handleTestCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: [
            {
              name: "Sony Xperia 1 VI",
              image: "https://via.placeholder.com/150",
              price: 87200,
              quantity: 1,
            },
          ],
        }),
      });

      const data = await res.json();
      if (data.id) {
        window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
      } else {
        alert("Checkout session failed.");
        console.log(data);
      }
    } catch (error) {
      console.error("Checkout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Stripe Checkout Test</h1>
      <button
        onClick={handleTestCheckout}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Start Test Checkout"}
      </button>
    </div>
  );
}
