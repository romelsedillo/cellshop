"use client";

import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
const AddToCart = () => {
  return (
    <Button
      size="sm"
      className="absolute bottom-3 right-3 text-xs flex items-center rounded bg-pink-500 text-white cursor-pointer hover:bg-pink-600"
      onClick={(e) => {
        e.preventDefault();
        toast.success("Realme 14 Pro+ added to cart!");
      }}
    >
      <ShoppingCart className="h-4 w-4 mr-[2px]" /> Add
    </Button>
  );
};

export default AddToCart;
