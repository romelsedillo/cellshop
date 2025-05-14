import Link from "next/link";
import React from "react";
import { User } from "lucide-react";
import CartButton from "./CartButton";

const Navbar = () => {
  return (
    <nav className="w-full z-10 bg-white fixed">
      <div className="max-w-7xl mx-auto py-5 px-8 flex justify-between items-center">
        <div className="font-bold text-2xl">
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
          <Link href="/cart" className=" hover:underline">
            Cart
          </Link>
        </div>
        <div className="flex gap-4">
          <CartButton />
          <Link href="/login">
            <User className="text-pink-500" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
