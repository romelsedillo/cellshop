import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const FeaturedProducts = () => {
  return (
    <div className=" relative flex flex-col px-20 py-16">
      <h1 className="font-bold text-4xl mb-10">Top Picks For You</h1>
      <Tabs defaultValue="featured" className="w-full mb-12">
        <TabsList className=" absolute top-0 right-20 rounded">
          <TabsTrigger value="featured" className="rounded cursor-pointer ">
            Featured
          </TabsTrigger>
          <TabsTrigger value="new-arrivals" className="rounded cursor-pointer">
            New Arrivals
          </TabsTrigger>
        </TabsList>
        <TabsContent value="featured" className="w-full">
          <div className="flex gap-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-60 w-40 border-2 rounded-lg"></div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="new-arrivals">
          <div className="flex gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-60 w-40 border-2 rounded-lg"></div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <div className="text-center">
        <Link href="/products">
          <Button variant="outline" size="lg" className="rounded-full group">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
