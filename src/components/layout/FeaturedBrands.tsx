import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import iPhone from "@/images/brand/iPhone.webp";
import samsung from "@/images/brand/samsung-galaxy.jpg";
import google from "@/images/brand/google-pixel.jpg";
import OnePlus from "@/images/brand/OnePlus.jpg";
import xiaomi from "@/images/brand/xiaomi.jpeg";
import sony from "@/images/brand/Sony-Xperia.jpg";
import Image from "next/image";

const brands = [
  { name: "Apple", href: "/brands/apple", image: iPhone },
  { name: "Samsung", href: "/brands/samsung", image: samsung },
  { name: "Google", href: "/brands/google", image: google },
  { name: "OnePlus", href: "/brands/oneplus", image: OnePlus },
  { name: "Xiaomi", href: "/brands/xiaomi", image: xiaomi },
  { name: "Sony", href: "/brands/sony", image: sony },
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
          <div
            key={index}
            className="relative h-40 w-40 border-red-500 border rounded-lg overflow-hidden"
          >
            <Link href={brand.href}>
              <div className="">
                <Image
                  alt={brand.name}
                  src={brand.image}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="absolute z-20 border border-green-500 w-full flex items-center justify-center text-center text-white font-semibold ">
                {brand.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
