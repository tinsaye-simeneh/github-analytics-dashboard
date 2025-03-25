"use client";

import "@mantine/core/styles.css";
import { MantineProvider, Progress } from "@mantine/core";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { useAuthStore } from "@/store/authstore";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [progress, setProgress] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  const [layout, setLayout] = useState<"compact" | "comfortable">(
    "comfortable"
  );

  // Load saved preferences on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const storedLayout = localStorage.getItem("layout") as
      | "compact"
      | "comfortable"
      | null;
    if (storedTheme) setColorScheme(storedTheme);
    if (storedLayout) setLayout(storedLayout);
  }, []);

  // Save preferences to localStorage and apply theme
  useEffect(() => {
    localStorage.setItem("theme", colorScheme);
    localStorage.setItem("layout", layout);
    document.documentElement.setAttribute("data-theme", colorScheme);
  }, [colorScheme, layout]);

  // Page loading effect
  useEffect(() => {
    const handleStart = () => {
      setIsPageLoading(true);
      setProgress(20);
    };

    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setIsPageLoading(false);
        setProgress(0);
      }, 300);
    };

    handleStart();
    const timeout = setTimeout(handleComplete, 1000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isAuthenticated && pathname !== "/auth/login") {
      router.push("/auth/login");
    }
  }, [isAuthenticated, pathname, router]);

  const toggleTheme = () => {
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleLayout = () => {
    setLayout((prev) => (prev === "compact" ? "comfortable" : "compact"));
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>GitHub Analytics</title>
      </head>
      <body>
        <MantineProvider forceColorScheme={colorScheme}>
          {isPageLoading && (
            <Progress
              value={progress}
              color="blue"
              size="xs"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
              }}
            />
          )}
          <ToastContainer position="top-right" autoClose={3000} />
          <Navbar toggleTheme={toggleTheme} colorScheme={colorScheme} />
          <Suspense fallback={<div>Loading...</div>}>
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? //eslint-disable-next-line
                  React.cloneElement(child, { layout } as any)
                : child
            )}
          </Suspense>
        </MantineProvider>
      </body>
    </html>
  );
}
