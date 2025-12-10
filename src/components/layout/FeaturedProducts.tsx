import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Featured from "./Featured";
import Latest from "./Latest";

export const FeaturedProducts = () => {
  return (
    <div id="products" className="w-full bg-gray-100">
      <div className="max-w-7xl mx-auto relative flex flex-col px-5 xl:px-12 py-16">
        <h1 className="font-bold text-4xl text-gray-900 mb-2">
          Top Picks For You
        </h1>
        <p className=" mb-10 text-gray-600">
          A collection of this season’s top choices.
        </p>
        <Tabs defaultValue="featured" className="w-full mb-12">
          {/* Trigger buttons */}
          <TabsList className="mx-auto sm:absolute top-18 right-6 xl:right-12 rounded bg-white space-x-2">
            <TabsTrigger
              value="featured"
              className="rounded cursor-pointer text-pink-500 data-[state=active]:bg-pink-500 data-[state=active]:text-white px-6 py-3"
            >
              Featured
            </TabsTrigger>
            <TabsTrigger
              value="new-arrivals"
              className="rounded cursor-pointer text-pink-500 data-[state=active]:bg-pink-500 data-[state=active]:text-white px-6 py-3"
            >
              Latest
            </TabsTrigger>
          </TabsList>

          {/* Featured */}
          <TabsContent value="featured" className="w-full">
            <Featured />
          </TabsContent>

          {/* New Arrivals */}
          <TabsContent value="new-arrivals">
            <Latest />
          </TabsContent>
        </Tabs>
      </div>
      <div className="text-center">
        <Link href="/products">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full group cursor-pointer"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
