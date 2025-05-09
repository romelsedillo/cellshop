import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";
import AddToWishList from "./AddToWishList";
import { IoIosStar } from "react-icons/io";
import type { Product } from "@/types/product";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { Heart } from "lucide-react";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link href={`/product-details/${product.id}`}>
      <div className="group flex flex-col justify-between bg-white h-[450px] w-52 border border-slate-200 shadow rounded overflow-hidden p-4">
        {/* Top: Badges + Wishlist */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            {product.isNew && (
              <Badge className="rounded bg-white font-semibold text-pink-500 border border-pink-200">
                New
              </Badge>
            )}
            {product.featured && (
              <Badge className="rounded bg-white border border-pink-500 font-semibold text-pink-500">
                Featured
              </Badge>
            )}
          </div>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full cursor-pointer border border-pink-200"
            onClick={(e) => {
              e.preventDefault();
              toast.success("Added to wishlist!");
            }}
          >
            <Heart className="h-4 w-4 text-pink-500" />
          </Button>
        </div>

        {/* Image */}
        <div className="w-44 h-52 mx-auto flex items-center justify-center">
          <Image
            alt={product.name}
            src={product.image}
            width={500}
            height={500}
            priority
            className="w-40 mx-auto group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="w-full mt-3 space-y-1">
          <h2 className="font-bold text-sm">{product.name}</h2>
          <p className="text-slate-500 text-xs">
            {product.brand || "Smartphone"}
          </p>
          <div className="flex gap-1 text-pink-500 text-sm">
            {[...Array(5)].map((_, i) => (
              <IoIosStar key={i} />
            ))}
          </div>
          <p className="text-lg font-semibold text-gray-900">
            ₱ {product.price.toLocaleString()}.00
          </p>
        </div>

        {/* Add to Cart Button */}
        <Button
          size="sm"
          className="w-full mt-4 text-xs flex items-center justify-center rounded bg-pink-500 text-white hover:bg-pink-600 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            toast.success(product.name);
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
