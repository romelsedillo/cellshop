"use client";

import { useEffect, useState } from "react";
import Login from "@/components/layout/Login";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/layout/LoadingSpinner";

const LoginPage = () => {
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

  return <>{loading ? <LoadingSpinner /> : <Login />}</>;
};

export default LoginPage;
