"use client";

import React from "react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useCartStore();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <p className="p-4 text-center text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="p-2 space-y-4">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-3"
        >
          <div className="flex items-center gap-4">
            <Image
              src={item.image}
              alt={item.name}
              width={50}
              height={50}
              className="rounded"
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">
                ₱ {item.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Button
                  size="sm"
                  onClick={() => decreaseQty(item.id)}
                  className="bg-pink-500 text-white rounded hover:bg-pink-600 text-sm cursor-pointer"
                >
                  −
                </Button>
                <span className="px-2">{item.quantity}</span>
                <Button
                  size="sm"
                  onClick={() => increaseQty(item.id)}
                  className="bg-pink-500 text-white rounded hover:bg-pink-600 text-sm cursor-pointer"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-bold">
              ₱ {(item.price * item.quantity).toLocaleString()}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 rounded cursor-pointer"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center border-t pt-4">
        <p className="font-bold text-lg">
          Total: ₱ {totalPrice.toLocaleString()}
        </p>
        <Button
          variant="destructive"
          onClick={clearCart}
          className="rounded cursor-pointer"
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
