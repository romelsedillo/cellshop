"use client";
import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";
import realMe from "@/images/realme-14pro-plus-1.jpg";
import AddToWishList from "./AddToWishList";
import AddToCart from "./AddToCart";

const ProductCard = () => {
  return (
    <div className="relative h-80 w-60 border border-slate-200 shadow rounded-lg overflow-hidden px-6 py-4">
      <Badge
        variant="secondary"
        className="absolute bg-white text-pink-500 z-10 top-2 left-2 border border-pink-200"
      >
        New
      </Badge>
      <AddToWishList />
      <AddToCart />
      <Link href={"#"}>
        <Image
          alt=""
          src={realMe}
          width={500}
          height={500}
          className=" w-60 mx-auto mb-4"
        />
        <div className="w-full">
          <h2 className="text-xl font-bold">Realme 14 Pro+</h2>
          <p className="text-slate-500 mb-3">Realme</p>
          <p className="text-lg">₱ 27,999.00</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
