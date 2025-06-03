import { supabase } from "@/lib/supabaseClient";
import { create } from "zustand";
import { User } from "@supabase/supabase-js";

type AuthStore = {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  authenticated: false,

  fetchUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    set({ user, loading: false });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
