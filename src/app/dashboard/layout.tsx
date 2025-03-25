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
    <div className="justify-between">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
