"use client";

import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const CheckoutPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const { fetchUser, user } = useAuthStore();
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCartStore();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  useEffect(() => {
    const init = async () => {
      await fetchUser();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = useAuthStore.getState().user;
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };

    init();
  }, [router, fetchUser]);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  const handleRemoveFromCart = (item: CartItem) => {
    removeFromCart(item.id);
    toast.info(`${item.name} removed from cart.`);
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const cart = useCartStore.getState().cart;

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cart,
          user: {
            id: user?.id,
            email: user?.email,
          },
        }),
      });

      const data = await res.json();

      if (data?.id) {
        stripe?.redirectToCheckout({ sessionId: data.id });
      } else {
        toast.error("Failed to initiate checkout.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong during checkout.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6 mb-6">
            {cart.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex items-center border-b pb-4 gap-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />

                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600 text-sm">
                    ₱ {item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <p className="mr-2 text-gray-700">Quantity:</p>
                      <Button
                        size="sm"
                        onClick={() => decreaseQty(item.id)}
                        className="bg-pink-500 text-white hover:bg-pink-600 cursor-pointer"
                      >
                        −
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        size="sm"
                        onClick={() => increaseQty(item.id)}
                        className="bg-pink-500 text-white hover:bg-pink-600"
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      onClick={() => handleRemoveFromCart(item)}
                      className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    >
                      Remove
                    </Button>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Subtotal: ₱ {(item.price * item.quantity).toLocaleString()}
                    .00
                  </p>
                </div>
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
            className="w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600 transition cursor-pointer"
          >
            Confirm Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
