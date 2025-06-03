"use client";

import { useEffect, useState } from "react";
import Login from "@/components/layout/Login";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
  const { user, fetchUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      await fetchUser(); // fetch user data
      await new Promise((resolve) => setTimeout(resolve, 2000)); // wait 2 seconds

      if (useAuthStore.getState().user) {
        router.push("/"); // redirect if user is already logged in
      } else {
        setLoading(false); // show login UI only after delay
      }
    };

    init();
  }, [router, fetchUser]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default LoginPage;
