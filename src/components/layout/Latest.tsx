"use client";

import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { useProductStore } from "@/store/useProductStore";
import type { Product } from "@/types/product";
import ProductSkeletonCard from "./ProductSkeletonCard";

const Latest: React.FC = () => {
  const { loading, error, fetchLatestProducts, latestProducts } =
    useProductStore();

  useEffect(() => {
    fetchLatestProducts();
  }, [fetchLatestProducts]);

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
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {loading ? (
        <motion.div className="col-span-6 grid grid-cols-6 gap-2">
          {Array.from({ length: 12 }).map((_, index) => (
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
        latestProducts.map((prod: Product) => (
          <motion.div key={prod.id} variants={item}>
            <ProductCard key={prod.id} product={prod} />
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default Latest;
