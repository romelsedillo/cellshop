"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/layout/LoadingSpinner";

import UserAccountSideNav from "@/components/layout/UserAccountSideNav";

export default function UserAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-6xl min-h-screen mx-auto grid grid-cols-12 py-6">
          {/* Sidebar */}
          <UserAccountSideNav />

          {/* Main content */}
          <main className="col-span-10 shadow-lg border px-6 py-2">
            {children}
          </main>
        </div>
      )}
    </>
  );
}
