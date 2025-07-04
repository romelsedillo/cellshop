"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "@/lib/supabaseFavorites";

export function FavoriteButton({ productId }: { productId: string }) {
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

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
    try {
      if (favorited) {
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
        <HeartOff className="h-4 w-4 text-pink-500" />
      ) : (
        <Heart className="h-4 w-4 text-pink-500" />
      )}
    </Button>
  );
}
