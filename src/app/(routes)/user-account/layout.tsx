"use client";

import Link from "next/link";
import { User, ListOrdered, BookHeart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function UserAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    {
      name: "Profile",
      pathname: "/user-account/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      name: "Orders",
      pathname: "/user-account/orders",
      icon: <ListOrdered className="w-5 h-5" />,
    },
    {
      name: "Favorites",
      pathname: "/user-account/favorites",
      icon: <BookHeart className="w-5 h-5" />,
    },
  ];

  return (
    <div className="max-w-6xl min-h-screen mx-auto grid grid-cols-12 py-6">
      {/* Sidebar */}
      <aside className="col-span-2 px-6">
        <div className="flex flex-col col-span-2 mb-4 mx-auto">
          <div>
            <div className="flex items-center justify-center bg-green-300 h-20 w-20 rounded-full">
              P
            </div>
            <h2 className="font-semibold">Romel Sedillo</h2>
          </div>
        </div>
        <nav className="space-y-2 w-full">
          {links.map((link) => {
            const isActive = pathname === link.pathname;
            return (
              <Link
                key={link.name}
                href={link.pathname}
                className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${
                  isActive
                    ? "border-l-2 border-pink-500 pl-4 text-pink-600"
                    : "border-l-2 border-transparent pl-2 hover:pl-4 hover:border-pink-300 hover:text-pink-500"
                }`}
              >
                {link.icon} {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="col-span-10 shadow-lg border px-6 py-2">{children}</main>
    </div>
  );
}
