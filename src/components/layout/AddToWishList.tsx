"use client";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Heart } from "lucide-react";

const AddToWishList = () => {
  return (
    <Button
      size="icon"
      variant="outline"
      className="absolute z-10 top-2 right-2 h-8 w-8 rounded-full cursor-pointer border border-pink-200"
      onClick={(e) => {
        e.preventDefault();
        toast.success("Added to wishlist!");
      }}
    >
      <Heart className="h-4 w-4 text-pink-500" />
    </Button>
  );
};

export default AddToWishList;
