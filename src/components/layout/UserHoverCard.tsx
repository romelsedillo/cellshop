"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { User, LogOut, ListOrdered, BookHeart } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

const UserHoverCard = () => {
  const { user } = useAuthStore();
  const fullName = user?.user_metadata.name || "";
  const firstName = fullName.split(" ")[0];
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <User className="text-pink-500 cursor-pointer hover:opacity-80" />
      </HoverCardTrigger>
      <HoverCardContent align="center" className="w-80">
        <div className="flex flex-col gap-3">
          <div>
            <h4 className="text-lg font-semibold">
              Hi, <span className=" capitalize">{firstName}</span>
            </h4>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>

          <div className="flex flex-col gap-2 border-y py-3">
            <Link
              href="/profile"
              className="flex items-center gap-2 hover:text-pink-500 transition"
            >
              <User className="w-5 h-5" /> Profile
            </Link>
            <Link
              href="/orders"
              className="flex items-center gap-2 hover:text-pink-500 transition"
            >
              <ListOrdered className="w-5 h-5" /> Orders
            </Link>
            <Link
              href="/favorites"
              className="flex items-center gap-2 hover:text-pink-500 transition"
            >
              <BookHeart className="w-5 h-5" /> Favorites
            </Link>
          </div>

          <Link
            href="/logout"
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" /> Sign out
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;
