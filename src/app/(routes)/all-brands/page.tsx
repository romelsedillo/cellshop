import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

import iPhone from "@/images/brand/iPhone.webp";
import samsung from "@/images/brand/samsung-galaxy.webp";
import asus from "@/images/brand/asus.jpg";
import google from "@/images/brand/google-pixel.jpg";
import infinix from "@/images/brand/infinix.png";
import sony from "@/images/brand/Sony-Xperia.jpg";
import vivo from "@/images/brand/vivo.png";
import xiaomi from "@/images/brand/xiaomi.jpeg";
import realme from "@/images/brand/realme.webp";
import huawei from "@/images/brand/huawei.jpg";

const brands = [
  { name: "Apple", href: "/brand/apple", image: iPhone },
  { name: "Samsung", href: "/brand/samsung", image: samsung },
  { name: "Xioami", href: "/brand/xiaomi", image: xiaomi },
  { name: "Sony", href: "/brand/sony", image: sony },
  { name: "Vivo", href: "/brand/vivo", image: vivo },
  { name: "Realme", href: "/brand/realme", image: realme },
  { name: "Asus", href: "/brand/asus", image: asus },
  { name: "Huawei", href: "/brand/huawei", image: huawei },
  { name: "Google Pixel", href: "/brand/google", image: google },
  { name: "Infinix", href: "/brand/infinix", image: infinix },
];

const BrandsPage = () => {
  return (
    <section className="px-6 py-16 lg:px-20">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            All Mobile Phone Brands
          </h1>
          <p className="text-gray-500 mt-1">
            Browse our featured smartphone brands.
          </p>
        </div>
        <Link
          href="/"
          className="text-sm flex items-center gap-1 text-pink-500 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {brands.map((brand, index) => (
          <Link key={index} href={brand.href}>
            <Card
              style={{
                backgroundImage: `url(${brand.image.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-40 w-full border-2 rounded-lg flex items-center justify-center relative group transition-transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-black/40 rounded-lg group-hover:bg-black/30 transition" />
              <CardContent className="z-10 flex items-center justify-center h-full text-white text-center font-semibold text-xl">
                {brand.name}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BrandsPage;
