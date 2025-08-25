"use client";
import { useEffect, useState, useMemo } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "@/components/layout/ProductCard";
import ProductSkeletonCard from "@/components/layout/ProductSkeletonCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const brand = [
  { id: "1", label: "Apple", value: "apple" },
  { id: "2", label: "Samsung", value: "samsung" },
  { id: "3", label: "Xiaomi", value: "xiaomi" },
  { id: "4", label: "Sony", value: "sony" },
  { id: "5", label: "Vivo", value: "vivo" },
  { id: "6", label: "Realme", value: "realme" },
  { id: "7", label: "Asus", value: "asus" },
  { id: "8", label: "Huawei", value: "huawei" },
  { id: "9", label: "Google", value: "google" },
  { id: "10", label: "Infinix", value: "infinix" },
];

const categories = [
  { id: "best-camera", label: "Best Camera Phones", value: "best-camera" },
  { id: "high-battery", label: "High Battery Capacity", value: "high-battery" },
  { id: "gaming-phones", label: "Gaming Phones", value: "gaming-phones" },
  { id: "foldable-phones", label: "Foldable Phones", value: "foldable-phones" },
  { id: "budget-phones", label: "Budget Phones", value: "budget-phones" },
  { id: "mid-range", label: "Mid-Range Phones", value: "mid-range" },
  { id: "flagship", label: "Flagship Phones", value: "flagship" },
  { id: "tablet", label: "Tablet", value: "tablet" },
];

const ProductsPage = () => {
  const { allProducts, loading, error, fetchAllProducts } = useProductStore();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    if (selectedBrand) {
      products = products.filter(
        (p) => p.brand?.toLowerCase() === selectedBrand
      );
    }

    if (selectedCategory) {
      products = products.filter(
        (p) => p.category?.toLowerCase() === selectedCategory
      );
    }

    return products.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [allProducts, selectedBrand, selectedCategory, sortOrder]);

  return (
    <section className="w-full">
      <div className="max-w-7xl px-8 py-12 mx-auto">
        <div className="mx-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h1 className="text-4xl text-gray-900 font-bold mb-2">
                Browse Our Collection
              </h1>
              <p className="text-gray-600">
                Discover top-rated smartphones from your favorite brands.
              </p>
            </div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="border border-gray-300 px-3 py-2 rounded text-sm"
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-12 gap-2 mx-auto">
            {/* Filters */}
            <div className="col-span-2 flex flex-col gap-2">
              {/* Brand filter */}
              <div className="border border-gray-200 shadow-md bg-white py-4 px-6">
                <h1 className="text-xl font-semibold mb-2">Brands</h1>
                <RadioGroup
                  value={selectedBrand}
                  onValueChange={setSelectedBrand}
                >
                  {brand.map((b) => (
                    <div key={b.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={b.value}
                        id={b.id}
                        className="cursor-pointer"
                      />
                      <Label
                        htmlFor={b.id}
                        className="group cursor-pointer text-xs"
                      >
                        {b.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Category filter */}
              <div className="border border-gray-200 shadow-md bg-white py-4 px-6">
                <h1 className="text-xl font-semibold mb-2">Categories</h1>
                <RadioGroup
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  {categories.map((cate) => (
                    <div key={cate.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={cate.value}
                        id={cate.id}
                        className="cursor-pointer"
                      />
                      <Label
                        htmlFor={cate.id}
                        className="group cursor-pointer text-xs"
                      >
                        {cate.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Products */}
            <div className="col-span-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mx-auto">
              {loading ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <ProductSkeletonCard key={index} />
                ))
              ) : error ? (
                <p className="text-center font-medium text-lg text-red-500">
                  Error loading products.
                </p>
              ) : filteredProducts.length === 0 ? (
                <p className="text-center col-span-full text-gray-600">
                  No products found.
                </p>
              ) : (
                filteredProducts.map((prod) => (
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
