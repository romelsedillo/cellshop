import { FeaturedBrands } from "@/components/layout/FeaturedBrands";
import { FeaturedProducts } from "@/components/layout/FeaturedProducts";
import Hero from "@/components/layout/Hero";
import Testimony from "@/components/layout/Testimony";

export default function Home() {
  return (
    <div className="bg-slate-100">
      <Hero />
      <FeaturedProducts />
      <FeaturedBrands />
      <Testimony />
    </div>
  );
}
