"use client";

import React from "react";
import { useCartDrawerStore } from "@/store/useCartDrawerStore";
import { X } from "lucide-react";
import Cart from "./Cart";
import { ScrollArea } from "../ui/scroll-area";

const CartDrawer = () => {
  const { isOpen, closeCart } = useCartDrawerStore();
  return (
    <div
      className={`fixed inset-0 z-50 transition-all ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black opacity-45 backdrop-blur-xs transition-opacity`}
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-[90%] sm:w-[400px] bg-white shadow-xl p-4 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button
            onClick={closeCart}
            className="cursor-pointer w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            <X className="w-4 h-4 text-pink-500" />
          </button>
        </div>
        <ScrollArea className="h-[480px] w-full">
          <Cart />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CartDrawer;
