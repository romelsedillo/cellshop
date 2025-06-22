"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Profile from "@/components/layout/Profile";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const { fetchUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      await fetchUser();
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!useAuthStore.getState().user) {
        router.push("/");
      } else {
        setLoading(false);
      }
    };

    init();
  }, [router, fetchUser]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {loading ? (
        <div className="flex justify-center items-center h-[50%vh]">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="w-full bg-gray-200">
          <h2>My Account</h2>
          Link
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
