"use client";

import { ShoppingCart } from "lucide-react";
import { useCartDrawerStore } from "@/store/useCartDrawerStore";
import { useCartStore } from "@/store/useCartStore";

const CartButton = () => {
  const { openCart } = useCartDrawerStore();
  const totalItems = useCartStore((state) =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <button onClick={openCart} className="relative cursor-pointer">
      {totalItems > 0 && (
        <span className="absolute z-10 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white border-2 border-white -top-2 -right-2">
          {totalItems}
        </span>
      )}

      <ShoppingCart className="w-6 h-6 text-pink-500 hover:text-pink-600" />
    </button>
  );
};

export default CartButton;
