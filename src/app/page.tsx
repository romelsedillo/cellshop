import { FeaturedBrands } from "@/components/layout/FeaturedBrands";
import { FeaturedProducts } from "@/components/layout/FeaturedProducts";
import Hero from "@/components/layout/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <FeaturedBrands />
    </div>
  );
}
