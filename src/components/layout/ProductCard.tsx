"use client";
import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";
import realMe from "@/images/realme-14pro-plus-1.jpg";
import AddToWishList from "./AddToWishList";
import AddToCart from "./AddToCart";
import { IoIosStar } from "react-icons/io";

const ProductCard = () => {
  return (
    <Link href={"#"}>
      <div className="group relative bg-white h-80 w-52 border border-slate-200 shadow rounded overflow-hidden px-4 py-4">
        <Badge
          variant="secondary"
          className="absolute rounded bg-white font-semibold text-pink-500 z-10 top-2 left-2 border border-pink-200"
        >
          New
        </Badge>
        <AddToWishList />
        <AddToCart />
        <div className="w-40 h-48 mx-auto flex items-center justify-center">
          <Image
            alt=""
            src={realMe}
            width={500}
            height={500}
            className=" w-36 mx-auto group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="w-full">
          <h2 className=" font-bold">Realme 14 Pro+</h2>
          <p className="text-slate-500 mb-2 text-xs">Realme</p>
          <div className="flex gap-1 text-pink-500">
            <IoIosStar className="h-2 w-2" />
            <IoIosStar className="h-2 w-2" />
            <IoIosStar className="h-2 w-2" />
            <IoIosStar className="h-2 w-2" />
            <IoIosStar className="h-2 w-2" />
          </div>
          <p className="text-lg">₱ 27,999.00</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
