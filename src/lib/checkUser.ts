import { supabase } from "./supabaseClient";

export const checkUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  return data.user;
};
