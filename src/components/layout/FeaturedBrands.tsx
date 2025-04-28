import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const brands = [
  { name: "Apple", href: "/brands/apple" },
  { name: "Samsung", href: "/brands/samsung" },
  { name: "Google", href: "/brands/google" },
  { name: "OnePlus", href: "/brands/oneplus" },
  { name: "Xiaomi", href: "/brands/xiaomi" },
  { name: "Sony", href: "/brands/sony" },
];

export const FeaturedBrands = () => {
  return (
    <section className="px-20 py-16">
      <div className="w-full flex items-center justify-between mb-10">
        <div className="max-w-xl">
          <h1 className="font-bold text-4xl">Featured Brands</h1>
          <p>
            Explore our selection of top-tier smartphone brands, each offering
            unique features and innovations.
          </p>
        </div>
        <div>
          <Link href="/brands" className="flex items-center gap-2">
            <span className="hover:underline">View all brands</span>
            <ArrowRight />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {brands.map((brand, index) => (
          <Link key={index} href={brand.href}>
            <Card className="h-40 w-40 border-2 rounded-lg flex items-center justify-center">
              <CardContent className="flex items-center justify-center h-full text-center font-semibold">
                {brand.name}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
