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
      <div className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div className="max-w-lg">
            <h1 className="text-center sm:text-left font-bold text-4xl">
              Featured Brands
            </h1>
            <p className="text-center sm:text-left">
              Explore our selection of top-tier smartphone brands, each offering
              unique features and innovations.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center justify-center md:justify-end">
            <Link href="/all-brands" className="flex items-center gap-2">
              <span className="hover:underline">View all brands</span>
              <ArrowRight />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-8 xl:px-0 mx-auto">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="w-full max-w-xs mx-auto overflow-hidden rounded-md shadow-lg shadow-slate-400"
            >
              <Link href={brand.href}>
                <div className="group relative aspect-[16/9] w-full overflow-hidden transition-transform duration-300">
                  {/* Image */}
                  <Image
                    alt={brand.name}
                    src={brand.image}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    fill
                    sizes="(max-width: 640px) 100vw,
                   (max-width: 768px) 50vw,
                   (max-width: 1280px) 33vw,
                   25vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* Text */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
                    <h2 className="font-semibold text-xl sm:text-2xl">
                      {brand.name}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm underline-offset-4 transition-all group-hover:underline">
                      View products
                    </p>
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
