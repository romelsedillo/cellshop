import Link from "next/link";
import React from "react";
import { ShoppingCart, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className=" bg-white">
      <div className="max-w-7xl py-5 px-8 flex justify-between items-center mx-auto">
        <div className="font-bold text-lg">
          <Link href="/">
            Pick<span className="text-pink-500">Cell</span> Shop
          </Link>
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
      </div>
    </nav>
  );
};

export default Navbar;
