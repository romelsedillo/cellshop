"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import apple from "@/images/apple.jpg";
import google from "@/images/google-pixel.jpg";
import { StaticImageData } from "next/image";

type Product = {
  id: string;
  name: string;
  image: StaticImageData;
  price: number;
  featured?: boolean;
  isNew?: boolean;
  brand: string;
};

const fakeProducts: Product[] = [
  {
    id: "1",
    name: "Apple iPad Air 13 (2025)",
    image: apple,
    price: 75000,
    featured: true,
    isNew: true,
    brand: "Apple",
  },
  {
    id: "2",
    name: "Samsung Galaxy S23",
    image: google,
    price: 60000,
    featured: false,
    isNew: true,
    brand: "Samsung",
  },
  {
    id: "3",
    name: "Google Pixel 8",
    image: google,
    price: 50000,
    featured: true,
    brand: "Google",
  },
  {
    id: "4",
    name: "Xiaomi 13 Ultra",
    image: google,
    price: 40000,
    brand: "Xiaomi",
  },
  {
    id: "5",
    name: "OnePlus 11",
    image: google,
    price: 42000,
    isNew: true,
    brand: "OnePlus",
  },
  {
    id: "6",
    name: "Google Pixel 8",
    image: google,
    price: 50000,
    featured: true,
    brand: "Google",
  },
  {
    id: "7",
    name: "Xiaomi 13 Ultra",
    image: google,
    price: 40000,
    brand: "Xiaomi",
  },
  {
    id: "8",
    name: "OnePlus 11",
    image: google,
    price: 42000,
    isNew: true,
    brand: "OnePlus",
  },
];

const sortOptions = [
  { label: "Name (A-Z)", value: "name_asc" },
  { label: "Name (Z-A)", value: "name_desc" },
  { label: "Price (Low to High)", value: "price_asc" },
  { label: "Price (High to Low)", value: "price_desc" },
];

const AllProductsPage = () => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let filtered = [...fakeProducts];

    if (query.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setProducts(filtered);
  }, [query, sortBy]);

  return (
    <section className="px-6 py-12 lg:px-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Product Catalog</h1>
        <p className="text-muted-foreground">Browse and discover smartphones</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="relative group overflow-hidden rounded"
          >
            <Link href={`/products/${product.id}`}>
              <div className="relative w-48 h-52 mx-auto flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="w-48 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-pink-600 font-bold text-sm mb-2">
                  ₱{product.price.toLocaleString()}
                </p>
                <div className="flex gap-2">
                  {product.featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                  {product.isNew && <Badge variant="secondary">New</Badge>}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {!products.length && (
        <p className="text-center text-muted-foreground mt-10">
          No products found.
        </p>
      )}
    </section>
  );
};

export default AllProductsPage;
