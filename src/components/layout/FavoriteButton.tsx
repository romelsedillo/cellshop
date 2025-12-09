"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "@/lib/supabaseFavorites";
import { useRouter } from "next/navigation";

export function FavoriteButton({ productId }: { productId: string }) {
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const check = async () => {
      try {
        const result = await isFavorite(productId);
        setFavorited(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, [productId]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    try {
      if (!user) {
        router.push("/login");
      } else if (favorited) {
        await removeFavorite(productId);
        setFavorited(false);
        toast.success("Removed from wishlist!");
      } else {
        await addFavorite(productId);
        setFavorited(true);
        toast.success("Added to wishlist!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Button
      size="icon"
      variant="outline"
      className="h-8 w-8 rounded-full cursor-pointer border border-pink-200"
      onClick={handleToggle}
      disabled={loading}
    >
      {favorited ? (
        <FaHeart className="h-4 w-4 text-pink-500" />
      ) : (
        <FaRegHeart className="h-4 w-4 text-pink-500" />
      )}
    </Button>
  );
}
