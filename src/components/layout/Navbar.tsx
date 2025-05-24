"use client";

import { useEffect } from "react";
import Link from "next/link";
import CartButton from "./CartButton";
import { Button } from "../ui/button";
import UserHoverCard from "./UserHoverCard";
import { useAuthStore } from "@/store/useAuthStore";

const Navbar = () => {
  const { user, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <nav className="w-full z-10 bg-white fixed">
      <div className="max-w-7xl mx-auto py-5 px-4 flex justify-between items-center">
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
        </div>
        <div className="flex items-center gap-4">
          <CartButton />
          {user && <UserHoverCard />}
          {!user && (
            <Button
              asChild
              className="bg-pink-500 hover:bg-pink-600 cursor-pointer"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
          {user && (
            <Button
              className="bg-pink-500 hover:bg-pink-600 cursor-pointer"
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
