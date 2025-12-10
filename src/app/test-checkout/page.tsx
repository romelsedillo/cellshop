"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import google from "@/images/test/google-pixel-9a.jpg";
import infinix from "@/images/test/infinix-note50-pro-plus.jpg";
import realme from "@/images/test/realme-14pro-plus.jpg";
import samsung from "@/images/test/samsung-galaxy-a56.jpg";
import { StaticImageData } from "next/image";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: StaticImageData;
};

const cart: CartItem[] = [
  {
    id: 1,
    name: "Google Pixel 9a",
    price: 25999,
    quantity: 1,
    image: google,
  },
  {
    id: 2,
    name: "Infinix Note 50 Pro+",
    price: 18999,
    quantity: 2,
    image: infinix,
  },
  {
    id: 3,
    name: "Realme 14 Pro+",
    price: 21999,
    quantity: 1,
    image: realme,
  },
  {
    id: 4,
    name: "Samsung Galaxy A56",
    price: 23999,
    quantity: 1,
    image: samsung,
  },
];

export default function TestCheckout() {
  // total price calculation
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
                className="flex flex-col sm:flex-row items-center sm:items-stretch border-b pb-4 gap-4"
              >
                <div className="w-full sm:w-[200px] flex justify-center items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="object-contain max-h-[200px]"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="font-semibold text-3xl">{item.name}</h2>
                  <p className="text-gray-600 text-xl">
                    ₱ {item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <p className="mr-2 text-xl text-gray-700">Quantity:</p>
                      <Button
                        size="xs"
                        className="bg-pink-500 text-white rounded hover:bg-pink-600 cursor-pointer"
                      >
                        −
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        size="xs"
                        className="bg-pink-500 text-white rounded hover:bg-pink-600"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <p className="mt-2 text-xl text-gray-500">
                    Subtotal:{" "}
                    <span className="text-pink-600 font-semibold">
                      ₱ {(item.price * item.quantity).toLocaleString()}
                      .00
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <Button className="bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex justify-between gap-2 text-gray-700">
              <p className="text-lg">
                Total Items:{" "}
                <span className="text-pink-600 font-semibold">
                  {cart.length}
                </span>
              </p>
            </div>
            <div className="">
              <p className="text-lg">
                Total:{" "}
                <span className="text-pink-600 font-semibold">
                  ₱ {totalPrice.toLocaleString()}.00
                </span>
              </p>
            </div>
          </div>

          <button className="w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600 transition cursor-pointer">
            Confirm Checkout
          </button>
        </>
      )}
    </div>
  );
}
