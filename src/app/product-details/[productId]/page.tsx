"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "@/store/useProductStore";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";

const ProductDetailsPage: React.FC<Props> = () => {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const productId = params.productId as string;
  const { allProducts, fetchAllProducts } = useProductStore();

  useEffect(() => {
    if (allProducts.length === 0) {
      fetchAllProducts();
    }
  }, [fetchAllProducts, allProducts.length]);

  const product = allProducts.find((p) => p.id === productId);
  console.log("Selected Product:", product);

  if (!product) {
    return <p className="p-4">Loading product details...</p>;
  }
  const add = () => {
    setQuantity((prev) => prev + 1);
  };
  const subtract = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const price = product.price;
  const subTotal = price * quantity;

  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-20 py-16 grid grid-cols-2 gap-8">
        <div className="col-span-1 flex flex-col">
          <div className="group rounded border flex items-center justify-center w-full py-10 mb-4 cursor-pointer">
            <div className="">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                priority
                className="w-68 h-68 object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="">
            {product.featured && (
              <span className="text-pink-500 border-2 border-pink-500 py-1 px-2 rounded text-center mr-4 mb-2">
                Featured
              </span>
            )}
            {product.isNew && (
              <span className="text-blue-500 font-medium mb-2">
                New Arrival
              </span>
            )}
          </div>
          <h1 className="text-4xl font-semibold text-black mb-1">
            {product.name}
          </h1>
          <p className="text-lg text-gray-700 mb-4">{product.brand}</p>
          <p className="text-2xl text-pink-600 font-semibold mb-1">
            ₱ {product.price.toLocaleString()}.00
          </p>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <IoIosStar className="text-yellow-500" />
              <IoIosStar className="text-yellow-500" />
              <IoIosStar className="text-yellow-500" />
              <IoIosStar className="text-yellow-500" />
              <IoIosStar className="text-yellow-500" />
            </div>
            <p className="text-gray-800 text-sm font-semibold">30 Reviews</p>
          </div>
          <p className="text-gray-700 text-sm mb-4 ">{product.description}</p>
          <div className="w-full flex items-center mb-2">
            <p className="mr-4">Quantity:</p>
            <button
              className="cursor-pointer w-8 h-8 border border-pink-500 rounded text-pink-500 mr-2"
              onClick={() => add()}
            >
              +
            </button>
            <p className="mr-2">{quantity}</p>
            <button
              className="cursor-pointer h-8 w-8 border border-pink-500 rounded text-pink-500"
              onClick={() => subtract()}
            >
              -
            </button>
          </div>
          <p className="mb-3">
            Sub Total:{" "}
            <span className="text-pink-500">
              {" "}
              ₱ {subTotal.toLocaleString()}.00
            </span>
          </p>
          <button className="bg-pink-500 w-full text-center text-white rounded py-2 cursor-pointer hover:bg-pink-600">
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
