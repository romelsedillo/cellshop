"use client";
import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "@/components/layout/ProductCard";
import ProductSkeletonCard from "@/components/layout/ProductSkeletonCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const brand = [
  { id: "1", label: "Apple", value: "apple" },
  { id: "2", label: "Samsung", value: "samsung" },
  { id: "3", label: "Xiaomi", value: "xiaomi" },
  { id: "4", label: "Oppo", value: "oppo" },
  { id: "5", label: "Vivo", value: "vivo" },
  { id: "6", label: "Realme", value: "realme" },
  { id: "7", label: "OnePlus", value: "oneplus" },
  { id: "8", label: "Huawei", value: "huawei" },
  { id: "9", label: "Google", value: "google" },
  { id: "10", label: "Infinix", value: "infinix" },
];

const ProductsPage = () => {
  const { allProducts, loading, error, fetchAllProducts } = useProductStore();
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  console.log(allProducts);
  return (
    <section className="w-full">
      <div className="max-w-7xl px-12 py-12 mx-auto">
        <div className="mx-auto">
          <h1 className="text-4xl text-gray-900 font-bold mb-2">
            Browse Our Collection
          </h1>
          <p className="mb-10 text-gray-600">
            Discover top-rated smartphones from your favorite brands.
          </p>
          <div className="grid grid-cols-12 gap-4 mx-auto">
            <div className="col-span-3 flex flex-col gap-4">
              <div className="border border-gray-200 shadow-md bg-white py-4 px-6">
                <h1>Brands</h1>
                <RadioGroup defaultValue="comfortable">
                  {brand.map((b, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={b.value} id={b.id} />
                      <Label htmlFor={b.id}>{b.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="border border-gray-200 shadow-md bg-white">
                <h1>Categories</h1>
                <RadioGroup defaultValue="comfortable">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">Default</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label htmlFor="r2">Comfortable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="r3" />
                    <Label htmlFor="r3">Compact</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="col-span-9 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-auto">
              {loading ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <ProductSkeletonCard key={index} />
                ))
              ) : error ? (
                <p className="text-center font-medium text-lg text-red-500">
                  Error loading products.
                </p>
              ) : (
                allProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
