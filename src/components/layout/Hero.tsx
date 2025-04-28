"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Parallax } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import heroBg1 from "@/images/hero/hero-bg-1.png";
import heroBg2 from "@/images/hero/hero-bg-2.png";
import heroBg3 from "@/images/hero/hero-bg-3.png";

const heroSlides = [
  {
    image: heroBg1,
    title: "Find Your Perfect Phone",
    description:
      "Discover top brands, compare features, and shop your next cellphone with confidence.",
  },
  {
    image: heroBg2,
    title: "Latest Smartphones Deals",
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
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, Parallax]}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full"
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
            <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 px-6 py-12 lg:px-20 bg-white">
              {/* Text */}
              <div className=" w-full text-center lg:text-left max-w-xl">
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
                  <button className="px-6 py-3 bg-pink-500 text-white rounded-2xl hover:bg-pink-600 transition">
                    Shop Now
                  </button>
                  <button className="px-6 py-3 border border-pink-500 text-pink-500 rounded-2xl hover:bg-gray-100 transition">
                    Browse Brands
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="w-full max-w-md" data-swiper-parallax="-400">
                <Image
                  data-swiper-parallax="200"
                  src={slide.image}
                  alt="Phone mockup"
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
