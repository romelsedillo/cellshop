"use client";
import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "@/components/layout/ProductCard";

const ProductsPage = () => {
  const { allProducts, loading, error, fetchAllProducts } = useProductStore();
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  console.log(allProducts);
  return (
    <section className="w-full">
      <div className="max-w-7xl px-20 py-16">
        <h1 className="text-4xl text-gray-900 font-bold mb-2">
          Browse Our Collection
        </h1>
        <p className="mb-10 text-gray-600">
          Discover top-rated smartphones from your favorite brands.
        </p>
        {loading ? (
          <div>loading</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
