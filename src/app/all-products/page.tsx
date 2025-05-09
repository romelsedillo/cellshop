"use client"; // if you're in /app
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const fakeProducts: Product[] = [
  { id: 1, name: "iPhone 14", price: 60000, image: "/iphone.jpg" },
  { id: 2, name: "Samsung Galaxy S22", price: 50000, image: "/samsung.jpg" },
  { id: 3, name: "Google Pixel 7", price: 40000, image: "/pixel.jpg" },
  { id: 4, name: "Xiaomi 13 Pro", price: 30000, image: "/xiaomi.jpg" },
  { id: 5, name: "Realme GT Neo", price: 22000, image: "/realme.jpg" },
  { id: 6, name: "Infinix Zero 5G", price: 18000, image: "/infinix.jpg" },
  { id: 7, name: "OPPO Reno 8", price: 28000, image: "/oppo.jpg" },
  { id: 8, name: "Vivo V27", price: 25000, image: "/vivo.jpg" },
  { id: 9, name: "Nothing Phone 1", price: 32000, image: "/nothing.jpg" },
  { id: 10, name: "Motorola Edge", price: 35000, image: "/motorola.jpg" },
  { id: 11, name: "Huawei Nova 11", price: 33000, image: "/huawei.jpg" },
  { id: 12, name: "Asus ROG Phone", price: 68000, image: "/asus.jpg" },
];

const AllProductsPage = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedProducts = [...fakeProducts].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border border-gray-300 px-3 py-1 rounded text-sm"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded shadow hover:shadow-lg p-4 flex flex-col"
          >
            <Image
              width={300}
              height={300}
              src={product.image}
              alt={product.name}
              className="h-40 object-contain mb-3"
            />
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-pink-500 font-bold mb-2">
              ₱ {product.price.toLocaleString()}
            </p>
            <button className="mt-auto bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
