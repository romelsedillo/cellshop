import { User } from "@supabase/supabase-js";

export function getFirstName(user: User | null): string {
  if (!user) return "";

  const fullName = user.user_metadata?.name || "";
  const firstName = fullName.split(" ")[0] || "";

  return firstName;
}
