"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { useProductStore } from "@/store/useProductStore";
import { getFavoriteIds } from "@/lib/queries";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { removeFavorite } from "@/lib/supabaseFavorites";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  [key: string]: unknown; // optional: allow for future flexibility
};

const FavoritesPage = () => {
  const { user } = useAuthStore();
  const { allProducts, fetchAllProducts } = useProductStore();
  const { addToCart } = useCartStore();

  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavoriteProducts([]);
        setLoading(false);
        return;
      }

      try {
        const favoriteIds = await getFavoriteIds(user.id);
        const filtered = allProducts.filter((product: Product) =>
          favoriteIds.includes(product.id)
        );
        setFavoriteProducts(filtered);
      } catch (error: unknown) {
        const err = error as Error;
        console.error("Error fetching favorites:", err.message);
        toast.error("Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user, allProducts]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  const handleRemove = async (productId: string) => {
    try {
      await removeFavorite(productId);
      setFavoriteProducts((prev) =>
        prev.filter((item) => item.id !== productId)
      );
      toast.success("Removed from favorites.");
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Remove error:", err.message);
      toast.error("Failed to remove from favorites.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading your favorites...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Favorites</h2>

      {favoriteProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favoriteProducts.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/product-details/${item.id}`}
                      className="text-pink-600 hover:underline cursor-pointer"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded"
                      />
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    <Link
                      href={`/product-details/${item.id}`}
                      className="text-pink-600 hover:underline cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-pink-600 font-semibold">
                    ₱{item.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <Button
                      size="sm"
                      className="bg-pink-500 text-white hover:bg-pink-600"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-400 text-red-500 hover:bg-red-50"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border border-dashed border-pink-300 rounded-lg p-6 text-center text-gray-500 bg-white">
          You have no favorite items yet.
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
