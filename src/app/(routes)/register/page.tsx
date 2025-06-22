"use client";

import { useEffect, useState } from "react";
import Register from "@/components/layout/Register";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [loading, setLoading] = useState(true);
  const { fetchUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      await fetchUser();
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (useAuthStore.getState().user) {
        router.push("/");
      } else {
        setLoading(false);
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
        <Register />
      )}
    </>
  );
};
export default RegisterPage;
