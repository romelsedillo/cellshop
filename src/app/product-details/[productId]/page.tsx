"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "@/store/useProductStore";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();
  const params = useParams();
  const productId = params.productId as string;
  const { allProducts, fetchAllProducts } = useProductStore();

  useEffect(() => {
    if (allProducts.length === 0) {
      fetchAllProducts();
    }
  }, [fetchAllProducts, allProducts.length]);

  const product = allProducts.find((p) => p.id === productId);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }

    toast.success(`${product.name} added to cart!`);
  };

  if (!product) {
    return <p className="p-4">Loading product details...</p>;
  }

  const subTotal = product.price * quantity;

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
          <div className="mb-2">
            {product.featured && (
              <span className="text-pink-500 border-2 border-pink-500 py-1 px-2 rounded text-center mr-4 mb-2">
                Featured
              </span>
            )}
            {product.latest && (
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
              {[...Array(5)].map((_, index) => (
                <IoIosStar key={index} className="text-yellow-500" />
              ))}
            </div>
            <p className="text-gray-800 text-sm font-semibold">30 Reviews</p>
          </div>
          <p className="text-gray-700 text-sm mb-4 ">{product.description}</p>
          <div className="w-full flex items-center mb-2">
            <p className="mr-4">Quantity:</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                className="cursor-pointer w-8 h-8 bg-pink-500 rounded text-white hover:bg-pink-600"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <p className="mx-2">{quantity}</p>
              <button
                className="cursor-pointer h-8 w-8 bg-pink-500 rounded text-white hover:bg-pink-600"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          <p className="mb-3">
            Sub Total:{" "}
            <span className="text-pink-500">
              ₱ {subTotal.toLocaleString()}.00
            </span>
          </p>
          <button
            className="bg-pink-500 w-full text-center text-white rounded py-2 cursor-pointer hover:bg-pink-600"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
