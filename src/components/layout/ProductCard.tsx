import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";
import { IoIosStar } from "react-icons/io";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { Heart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { FavoriteButton } from "./FavoriteButton";
import { useAuthStore } from "@/store/useAuthStore";

export type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  price: number;
  featured?: boolean;
  latest?: boolean;
};

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const { user } = useAuthStore();

  const handleAddToCart = (product: Product) => {
    useCartStore.getState().addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Link href={`/product-details/${product.id}`}>
      <div className="group flex flex-col justify-between bg-white h-[430px] w-[195px] border border-slate-200 shadow rounded overflow-hidden p-4">
        {/* Top: Badges + Wishlist */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {product.latest && (
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
          {user ? (
            <FavoriteButton productId={product.id} />
          ) : (
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full cursor-pointer border border-pink-200"
            >
              <Heart className="h-4 w-4 text-pink-500" />
            </Button>
          )}
        </div>
        <div className="flex flex-col items-center">
          {/* Image */}
          <div className="w-40 h-52 mx-auto flex items-center justify-center">
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
        </div>
        <div className="w-full p-0 border">
          {/* Add to Cart Button */}
          <Button
            size="sm"
            className="w-full text-xs flex items-center justify-center rounded bg-pink-500 text-white hover:bg-pink-600 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              toast.success(product.name);
              handleAddToCart(product);
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
