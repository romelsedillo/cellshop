"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CartButton from "./CartButton";
import { Button } from "../ui/button";
import UserHoverCard from "./UserHoverCard";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Checkout", path: "/checkout" },
];

const Navbar = () => {
  const pathname = usePathname();
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    fetchUser();
    setLoading(false);
  }, [fetchUser]);

  const handleLogout = () => {
    logout();
    route.push("/login");
  };

  return (
    <nav className="w-full z-10 bg-white fixed">
      <div className="max-w-7xl mx-auto py-5 px-4 flex justify-between items-center">
        <div className="font-bold text-2xl">
          <Link href="/">
            Pick<span className="text-pink-500">Cell</span> Shop
          </Link>
        </div>
        <div className="flex gap-4 font-semibold text-sm">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative pb-1 transition-colors duration-300 ${
                  isActive
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-500"
                }`}
              >
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${
                    isActive
                      ? "bg-pink-500"
                      : "bg-pink-500 scale-x-0 group-hover:scale-x-100"
                  }`}
                  style={{ transformOrigin: "left" }}
                />
                {link.name}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          {loading
            ? "Loading"
            : user && (
                <Link href="/user-account/profile">
                  <UserHoverCard />
                </Link>
              )}
          <CartButton />
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
              onClick={handleLogout}
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
