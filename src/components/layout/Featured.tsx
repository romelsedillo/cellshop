"use client";

import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { useProductStore } from "@/store/useProductStore";
import type { Product } from "@/types/product";
import ProductSkeletonCard from "./ProductSkeletonCard";

const Featured: React.FC = () => {
  const { loading, error, fetchFeaturedProducts, featuredProducts } =
    useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {loading ? (
        <motion.div className="col-span-5 grid grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductSkeletonCard key={index} />
          ))}
        </motion.div>
      ) : error ? (
        <div className="col-span-5">
          <p className="text-center font-medium text-lg text-red-500">
            Error loading products.
          </p>
        </div>
      ) : (
        featuredProducts.map((prod: Product) => (
          <motion.div key={prod.id} variants={item}>
            <ProductCard key={prod.id} product={prod} />
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default Featured;
