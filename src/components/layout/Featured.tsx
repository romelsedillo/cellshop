"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const Featured = () => {
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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div key={index} variants={item}>
          <ProductCard />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Featured;
