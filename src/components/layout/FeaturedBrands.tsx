import Link from "next/link";
import { ArrowRight } from "lucide-react";
import iPhone from "@/images/brand/iPhone.webp";
import samsung from "@/images/brand/samsung-galaxy.webp";
import xiaomi from "@/images/brand/xiaomi.jpeg";
import OnePlus from "@/images/brand/OnePlus.jpg";
import infinix from "@/images/brand/infinix.png";
import vivo from "@/images/brand/vivo.png";
import Google from "@/images/brand/google-pixel.jpg";
import Sony from "@/images/brand/Sony-Xperia.jpg";
import Image from "next/image";

const brands = [
  { name: "Apple", href: "/brand/apple", image: iPhone },
  { name: "Samsung", href: "/brand/samsung", image: samsung },
  { name: "Vivo", href: "/brand/vivo", image: vivo },
  { name: "OnePlus", href: "/brand/oneplus", image: OnePlus },
  { name: "Xiaomi", href: "/brand/xiaomi", image: xiaomi },
  { name: "Infinix", href: "/brand/infinix", image: infinix },
  { name: "Google Pixel", href: "/brand/google-pixel", image: Google },
  { name: "Sony Xperia", href: "/brand/sony-xperia", image: Sony },
];

export const FeaturedBrands = () => {
  return (
    <section className="bg-white">
      <div className="px-8 py-16 max-w-7xl mx-auto">
        <div className="w-full flex items-center justify-between mb-10">
          <div className="max-w-xl">
            <h1 className="font-bold text-4xl">Featured Brands</h1>
            <p>
              Explore our selection of top-tier smartphone brands, each offering
              unique features and innovations.
            </p>
          </div>
          <div>
            <Link href="/all-brands" className="flex items-center gap-2">
              <span className="hover:underline">View all brands</span>
              <ArrowRight />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="shadow-lg shadow-slate-400 rounded-md overflow-hidden"
            >
              <Link href={brand.href}>
                <div className="group relative w-72 h-40 transition-transform duration-300">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full">
                      <Image
                        alt={brand.name}
                        src={brand.image}
                        className="w-full h-auto object-fill group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute w-full inset-0 bg-black/40" />
                    <div className="absolute z-20 w-full text-center text-white">
                      <h2 className=" font-semibold text-2xl">{brand.name}</h2>
                      <p className="text-xs group-hover:underline">
                        View products
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
