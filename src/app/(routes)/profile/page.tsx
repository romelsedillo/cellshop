"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/lib/supabaseClient";
import { checkUser } from "@/lib/checkUser";

const ProfilePage = () => {
  const { fetchUser, logout, user } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  console.log(user);
  const handleLogout = async () => {
    logout();
    toast.success("Signed out successfully.");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="text-lg font-semibold">
            {user.user_metadata?.name?.split(" ")[0] || "No name provided"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-semibold">{user.email}</p>
        </div>
        <Button
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600"
        >
          <LogOut size={18} /> Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
