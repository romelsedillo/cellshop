import React from "react";
import Image from "next/image";

const mockFavorites = [
  {
    id: "prod-1",
    name: "iPhone 14 Pro Max",
    price: 78990,
    image: "/images/iphone14pro.jpg",
  },
  {
    id: "prod-2",
    name: "Samsung Galaxy S24 Ultra",
    price: 72990,
    image: "/images/s24ultra.jpg",
  },
  {
    id: "prod-3",
    name: "Xiaomi 13T Pro",
    price: 33990,
    image: "/images/13tpro.jpg",
  },
  // Add or remove items to test empty state
];

const FavoritesPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Favorites</h2>

      {mockFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockFavorites.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
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
