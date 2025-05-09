import React from "react";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const contactInfo = [
  {
    icon: <MapPin className="text-pink-500" />,
    title: "Visit Us",
    description: "Dumaguete City",
  },
  {
    icon: <Phone className="text-pink-500" />,
    title: "Call Us",
    description: "+123 456 789",
  },
  {
    icon: <Clock className="text-pink-500" />,
    title: "Working Hours",
    description: "Mon - Sat: 8:00 AM - 5:00 PM",
  },
  {
    icon: <Mail className="text-pink-500" />,
    title: "Email Us",
    description: "test@gmail.com",
  },
];

const Footer = () => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto relative flex flex-col px-20">
        <div className="px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b gap-4">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="col-span-1 flex items-center gap-2 hover:bg-gray-50 p-4 cursor-pointer"
            >
              {info.icon}
              <div>
                <p className="font-semibold text-gray-900">{info.title}</p>
                <p className="flex text-gray-600 font-normal text-sm">
                  {info.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 pt-16 gap-8">
          <div className="col-span-1">
            <h1 className="text-2xl font-bold mb-4">
              Pick<span className="text-pink-500">Cell</span> Shop
            </h1>
            <p>
              Enjoy fast delivery, responsive customer support, and a commitment
              to quality you can rely on every time you shop.
            </p>
            <div className="mt-6 flex gap-6">
              <FaFacebook className="cursor-pointer w-7 h-7" />
              <FaInstagram className="cursor-pointer w-7 h-7" />
              <FaTiktok className="cursor-pointer w-7 h-7" />
              <FaXTwitter className="cursor-pointer w-7 h-7" />
            </div>
          </div>
          <div className="col-span-1">
            <h1 className="font-semibold text-lg mb-3">Quick Links</h1>
            <div className="flex flex-col gap-2">
              <Link href="" className="hover:underline text-sm">
                Home
              </Link>
              <Link href="" className="hover:underline text-sm">
                Products
              </Link>
              <Link href="" className="hover:underline text-sm">
                Checkout
              </Link>
              <Link href="" className="hover:underline text-sm">
                Login
              </Link>
            </div>
          </div>
          <div className="col-span-1">
            <h1 className="font-semibold text-lg mb-3">Top Brands</h1>
            <div className="flex flex-col gap-2">
              <Link href="" className="hover:underline text-sm">
                Apple
              </Link>
              <Link href="" className="hover:underline text-sm">
                Samsung
              </Link>
              <Link href="" className="hover:underline text-sm">
                Vivo
              </Link>
              <Link href="" className="hover:underline text-sm">
                OnePlus
              </Link>
              <Link href="" className="hover:underline text-sm">
                Xiaomi
              </Link>
              <Link href="" className="hover:underline text-sm">
                Infinix
              </Link>
            </div>
          </div>
          <div className="col-span-1">
            <h1 className="font-semibold text-lg mb-3">Newsletter</h1>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to our newsletter and be the first to know about new
              arrivals, exclusive deals, and special offers.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter your email"
                className="outline-none border-2 border-pink-500 focus-visible:border-pink-500 focus-visible:ring-pink-500/50 focus-visible:ring-[3px] h-8 rounded"
              />
              <Button
                type="submit"
                size="sm"
                className="cursor-pointer bg-pink-500 hover:bg-pink-600 rounded"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full text-center mt-10 py-6">
          <p className="text-gray-800">
            &copy; 2025{" "}
            <span className="font-bold">
              {" "}
              Pick<span className="text-pink-500">Cell</span> Shop
            </span>{" "}
            || All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
