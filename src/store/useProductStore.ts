import { create } from "zustand";
import type { Product } from "@/types/product";

type ProductStore = {
  allProducts: Product[];
  featuredProducts: Product[];
  latestProducts: Product[];
  loading: boolean;
  error: string | null;
  fetchAllProducts: () => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  fetchLatestProducts: () => Promise<void>;
};

export const useProductStore = create<ProductStore>((set) => ({
  allProducts: [],
  featuredProducts: [],
  latestProducts: [],
  loading: false,
  error: null,

  fetchAllProducts: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      set({ allProducts: data, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error", loading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch featured products.");
      const data: Product[] = await res.json();
      const featured = data.filter((product) => product.featured);
      set({ featuredProducts: featured, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch featured products.",
        loading: false,
      });
    }
  },
  fetchLatestProducts: async () => {
    try {set({ loading: true, error: null });

      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch featured products.");
      const data: Product[] = await res.json();
      const latest = data.filter((product) => product.latest);
      set({ latestProducts: latest, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch new products.",
        loading: false,
      });
    }
  },
}));
