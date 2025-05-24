import { supabase } from "@/lib/supabaseClient";
import { create } from "zustand";
import { User } from "@supabase/supabase-js";

type AuthStore = {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    set({ loading: true });
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log("Error fetching", error.message);
      set({ user: null, loading: false });
    } else {
      set({ user: data.user, loading: false });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
