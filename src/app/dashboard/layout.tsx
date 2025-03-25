"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authstore";
import Sidebar from "@/components/shared/Sidebar";
import { useEffect, useState } from "react";
import { Loader, Center } from "@mantine/core";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isAuthenticated === undefined) {
        setLoadingAuth(true);
        return;
      }

      if (!isAuthenticated) {
        router.push(`/auth/login?backTo=${encodeURIComponent(pathname)}`);
      } else {
        setLoadingAuth(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, router, pathname]);

  if (loadingAuth) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <div className="flex w-full">
      <div className="md:w-64 h-screen">
        <Sidebar />
      </div>

      <main className="w-full mt-10 md:mt-0">{children}</main>
    </div>
  );
}
