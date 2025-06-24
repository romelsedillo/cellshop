import Link from "next/link";
import { User, ListOrdered, BookHeart } from "lucide-react";

export default function UserAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <Link
            href="/user-account/profile"
            className="flex items-center gap-2 hover:text-pink-500 transition border-l-2 border-pink-500 pl-4"
          >
            <User className="w-5 h-5" /> Profile
          </Link>
          <Link
            href="/user-account/orders"
            className="flex items-center gap-2 hover:text-pink-500 transition"
          >
            <ListOrdered className="w-5 h-5" /> Orders
          </Link>
          <Link
            href="/user-account/favorites"
            className="flex items-center gap-2 hover:text-pink-500 transition"
          >
            <BookHeart className="w-5 h-5" /> Favorites
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="col-span-10 shadow-lg border px-6 py-2">{children}</main>
    </div>
  );
}
