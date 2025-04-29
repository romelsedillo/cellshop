import { create } from "zustand";
import { stripe } from "@/lib/stripe";
import type { Stripe } from "stripe";

interface ProductStore {
  products: Stripe.Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });

    try {
      const { data } = await stripe.products.list();
      set({ products: data });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
