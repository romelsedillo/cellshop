import React from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

const Profile = () => {
  const { fetchUser, logout, user } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    logout();
    toast.success("Signed out successfully.");
    router.push("/login");
  };

  return (
    <div className="p-6 space-y-4 border">
      <div>
        <p className="text-sm text-gray-500">Full Name</p>
        <p className="text-lg font-semibold">
          {user?.user_metadata?.name?.split(" ")[0] || "No name provided"}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Email</p>
        <p className="text-lg font-semibold">{user?.email}</p>
      </div>
      <Button
        onClick={handleLogout}
        className="w-full mt-4 flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600"
      >
        <LogOut size={18} /> Logout
      </Button>
    </div>
  );
};

export default Profile;
