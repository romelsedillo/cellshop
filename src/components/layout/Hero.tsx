"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Parallax } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import heroBg1 from "@/images/hero/hero-bg-1.jpg";
import heroBg2 from "@/images/hero/hero-bg-2.jpg";
import heroBg3 from "@/images/hero/hero-bg-3.jpg";
import { Button } from "../ui/button";

const heroSlides = [
  {
    image: heroBg1,
    title: "Find Your Perfect Phone",
    description:
      "Discover top brands, compare features, and shop your next cellphone with confidence.",
  },
  {
    image: heroBg2,
    title: "Newest Phone Offers",
    description:
      "Get exclusive discounts on your favorite phone brands only at Cellshop.",
  },
  {
    image: heroBg3,
    title: "Budget-Friendly Picks",
    description:
      "Shop quality phones without breaking the bank. Explore our budget collection.",
  },
];

const Hero = () => {
  return (
    <div className="relative w-full bg-white">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, Parallax]}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full max-w-7xl mx-auto"
        parallax={true}
        speed={1500}
      >
        <div
          slot="container-start"
          className="absolute top-0 left-0 w-full h-full"
          data-swiper-parallax-x="-23%"
        ></div>
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <section className="flex flex-col-reverse lg:flex-row items-center justify-between py-12 lg:px-20 bg-white">
              {/* Text */}
              <div className="w-full text-center lg:text-left max-w-xl">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  {slide.title}
                </h1>
                <p
                  data-swiper-parallax="-200"
                  className="text-gray-600 mb-6 text-lg"
                >
                  {slide.description}
                </p>
                <div
                  data-swiper-parallax="-300"
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button
                    size="lg"
                    className="bg-pink-500 text-white hover:bg-pink-600 transition"
                  >
                    Shop Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white border border-pink-500 text-pink-500 hover:text-pink-500 hover:bg-gray-100 transition"
                  >
                    Browse Brands
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div
                className="w-full flex items-center justify-center"
                data-swiper-parallax="-400"
              >
                <div className="">
                  <Image
                    data-swiper-parallax="200"
                    src={slide.image}
                    alt="Phone mockup"
                    width={300}
                    height={300}
                    className="w-60 h-60"
                    priority
                  />
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
