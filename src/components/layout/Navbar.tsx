"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CartButton from "./CartButton";
import { Button } from "../ui/button";
import UserHoverCard from "./UserHoverCard";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Checkout", path: "/checkout" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { user, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    };

    loadUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    await logout();
    setOpenMenu(false);
    router.push("/login");
  };

  const handleNavClick = () => setOpenMenu(false);

  return (
    <nav className="fixed w-full z-10 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-5 px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl">
          Pick<span className="text-pink-500">Cell</span> Shop
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4 font-semibold text-sm">
          {links.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.name}
                href={link.path}
                className={`group relative pb-1 transition-colors duration-300 ${
                  isActive
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-500"
                }`}
              >
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full transition-transform origin-left duration-300 ${
                    isActive
                      ? "bg-pink-500 scale-x-100"
                      : "bg-pink-500 scale-x-0 group-hover:scale-x-100"
                  }`}
                />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {loading
            ? "Loading..."
            : user && (
                <Link href="/user-account/profile">
                  <UserHoverCard />
                </Link>
              )}

          <CartButton />

          {!user && (
            <Button asChild className="bg-pink-500 hover:bg-pink-600">
              <Link href="/login">Login</Link>
            </Button>
          )}

          {user && (
            <Button
              className="bg-pink-500 hover:bg-pink-600"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          {openMenu ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {openMenu && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col gap-4 px-5 py-4">
            {links.map((link) => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-medium ${
                    isActive ? "text-pink-600" : "text-gray-700"
                  }`}
                  onClick={handleNavClick}
                >
                  {link.name}
                </Link>
              );
            })}

            <CartButton />

            {!user && (
              <Button
                asChild
                onClick={handleNavClick}
                className="bg-pink-500 hover:bg-pink-600 w-full"
              >
                <Link href="/login">Login</Link>
              </Button>
            )}

            {user && (
              <>
                <Link
                  href="/user-account/profile"
                  onClick={handleNavClick}
                  className="text-gray-700"
                >
                  Profile
                </Link>

                <Button
                  onClick={handleLogout}
                  className="bg-pink-500 hover:bg-pink-600 w-full"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
