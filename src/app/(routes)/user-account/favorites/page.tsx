"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { useProductStore } from "@/store/useProductStore";
import { getFavoriteIds } from "@/lib/queries";

const FavoritesPage = () => {
  const { user } = useAuthStore();
  const { allProducts, fetchAllProducts } = useProductStore();

  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products on mount
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Fetch favorite IDs and filter products
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavoriteProducts([]);
        setLoading(false);
        return;
      }

      try {
        const favoriteIds = await getFavoriteIds(user.id);
        const filtered = allProducts.filter((product) =>
          favoriteIds.includes(product.id)
        );
        setFavoriteProducts(filtered);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user, allProducts]);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteProducts.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-pink-600 font-medium">
                  ₱{item.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
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
