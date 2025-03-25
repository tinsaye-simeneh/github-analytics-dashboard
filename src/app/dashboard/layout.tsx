"use client";

import { useRouter } from "next/navigation";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading)
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );

  return (
    <div className="flex w-full">
      <div className="md:w-64 h-screen">
        <Sidebar />
      </div>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
