"use client";
import React from "react";
import { useParams } from "next/navigation";

const ProductsPage = () => {
  const { productId } = useParams();
  console.log(productId);
  return <div>Params id = {productId}</div>;
};

export default ProductsPage;
