"use client";
import { useEffect, useState } from "react";

export default function FavoritesClientPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      const res = await fetch("/api/favorites");
      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      }
      setLoading(false);
    }
    loadFavorites();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {favorites.length === 0 && <p>No favorites yet.</p>}
      {favorites.map((item) => (
        <div key={item.id} className="border p-2 rounded">
          <img src={item.image ?? ""} alt={item.name} className="w-full" />
          <div className="mt-2">
            <p className="font-semibold">{item.name}</p>
            <p className="text-pink-600">₱{item.price?.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
