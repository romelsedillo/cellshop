import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PickCell Shop",
  description:
    "PickCell Shop is your go-to destination for the latest and most reliable smartphones. Discover great deals, explore top brands, and enjoy a smooth shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col scroll-smooth`}
      >
        <Navbar />
        <main className="pt-16">
          {children}
          <CartDrawer />
        </main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
