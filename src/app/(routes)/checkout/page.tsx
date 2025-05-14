"use client";

import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }

    
    toast.success("Checkout successful!");
    clearCart();
    router.push("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center border-b pb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-contain mr-4"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600 text-sm">
                    ₱ {item.price.toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="text-right mb-4">
            <p className="text-lg">
              Total:{" "}
              <span className="text-pink-600 font-semibold">
                ₱ {totalPrice.toLocaleString()}.00
              </span>
            </p>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600 transition"
          >
            Confirm Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
