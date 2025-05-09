import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import iPhone from "@/images/brand/iPhone.webp";
import samsung from "@/images/brand/samsung-galaxy.webp";
import xiaomi from "@/images/brand/xiaomi.jpeg";
import OnePlus from "@/images/brand/OnePlus.jpg";
import infinix from "@/images/brand/infinix.png";
import vivo from "@/images/brand/vivo.png";
import Image from "next/image";

const brands = [
  { name: "Apple", href: "/brands/apple", image: iPhone },
  { name: "Samsung", href: "/brands/samsung", image: samsung },
  { name: "Vivo", href: "/brands/vivo", image: vivo },
  { name: "OnePlus", href: "/brands/oneplus", image: OnePlus },
  { name: "Xiaomi", href: "/brands/xiaomi", image: xiaomi },
  { name: "Infinix", href: "/brands/infinix", image: infinix },
];

export const FeaturedBrands = () => {
  return (
    <section className="bg-white">
      <div className="px-20 py-16 max-w-7xl mx-auto">
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
            <div key={index}>
              <Link href={brand.href}>
                <Card className="group relative shadow-md w-40 h-40 rounded-lg border-gray-200 border overflow-hidden transition-transform duration-300">
                  <CardContent className="w-full h-full flex items-center justify-center">
                    <div className="w-full">
                      <Image
                        alt={brand.name}
                        src={brand.image}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute w-full inset-0 bg-black/40" />
                    <div className="absolute z-20 w-full text-center text-white">
                      <h2 className=" font-semibold text-2xl">{brand.name}</h2>
                      <p className="text-xs group-hover:underline">
                        View products
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
