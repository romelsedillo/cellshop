import Link from "next/link";
import React from "react";
import { ShoppingCart, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="px-6 py-5 bg-pink-500 text-white flex justify-between items-center">
      <div className="font-bold text-lg">
        <Link href="/">PickCell Shop</Link>
      </div>
      <div className="flex gap-4 font-semibold text-sm">
        <Link href="/" className=" hover:underline">
          Home
        </Link>
        <Link href="/products" className=" hover:underline">
          Products
        </Link>
        <Link href="/checkout" className=" hover:underline">
          Checkout
        </Link>
      </div>
      <div className="flex gap-4">
        <ShoppingCart />
        <User />
      </div>
    </nav>
  );
};

export default Navbar;
