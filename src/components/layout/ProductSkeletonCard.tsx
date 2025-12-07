import React from "react";

const ProductSkeletonCard = () => {
  return (
    <div className="w-[195px] h-84 bg-white p-4 border rounded shadow animate-pulse mx-auto">
      <div className="bg-gray-300 h-48 w-full mb-4 rounded" />
      <div className="h-4 bg-gray-300 rounded mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
    </div>
  );
};

export default ProductSkeletonCard;
