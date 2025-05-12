import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Featured from "./Featured";
import NewArrivals from "./NewArrivals";

export const FeaturedProducts = () => {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto relative flex flex-col px-8 py-16">
        <h1 className="font-bold text-4xl text-gray-900 mb-2">
          Top Picks For You
        </h1>
        <p className=" mb-10 text-gray-600">
          A collection of this season’s top choices.
        </p>
        <Tabs defaultValue="featured" className="w-full mb-12">
          <TabsList className="absolute top-10 right-20 rounded bg-white space-x-2">
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
              New Arrivals
            </TabsTrigger>
          </TabsList>
          {/* Featured */}
          <TabsContent value="featured" className="w-full">
            <Featured />
          </TabsContent>

          {/* New Arrivals */}
          <TabsContent value="new-arrivals">
            <NewArrivals />
          </TabsContent>
        </Tabs>
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
    </div>
  );
};
