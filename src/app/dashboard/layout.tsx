"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authstore";
import Sidebar from "@/components/shared/Sidebar";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ marginLeft: "250px", paddingTop: "60px", width: "100%" }}>
        {children}
      </main>
    </div>
  );
}
