import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";
import AddToWishList from "./AddToWishList";
import AddToCart from "./AddToCart";
import { IoIosStar } from "react-icons/io";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link href={`/product-details/${product.id}`}>
      <div className="group relative bg-white h-84 w-52 border border-slate-200 shadow rounded overflow-hidden px-4 py-4">
        {product.isNew && (
          <Badge
            variant="secondary"
            className="absolute rounded bg-white font-semibold text-pink-500 z-10 top-2 left-2 border border-pink-200"
          >
            New
          </Badge>
        )}
        {product.featured && (
          <Badge className="absolute rounded bg-white border border-pink-500 font-semibold text-pink-500 z-10 top-2 left-2">
            Featured
          </Badge>
        )}
        <AddToWishList />
        <AddToCart />
        <div className="w-40 h-48 mx-auto flex items-center justify-center">
          <Image
            alt={product.name}
            src={product.image}
            width={500}
            height={500}
            priority
            className=" w-36 mx-auto group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="w-full">
          <h2 className=" font-bold">{product.name}</h2>
          <p className="text-slate-500 mb-2 text-xs">
            {product.brand || "Smartphone"}
          </p>
          <div className="flex gap-1 text-pink-500 text-sm">
            {[...Array(5)].map((_, i) => (
              <IoIosStar key={i} />
            ))}
          </div>
          <p className="text-lg">₱ {product.price.toLocaleString()}.00</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
