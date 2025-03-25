"use client";

import "@mantine/core/styles.css";
import { MantineProvider, Progress, Center, Loader } from "@mantine/core";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { useAuthStore } from "@/store/authstore";
import { useGitHubStore } from "@/store/githubStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { layout, colorScheme, setColorScheme } = useGitHubStore();
  const [progress, setProgress] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    if (storedTheme && !colorScheme) {
      setColorScheme(storedTheme);
    }
  }, [colorScheme, setColorScheme]);

  useEffect(() => {
    if (colorScheme) {
      localStorage.setItem("theme", colorScheme);
      document.documentElement.setAttribute("data-theme", colorScheme);
    }
  }, [colorScheme]);

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isAuthenticated === undefined) {
        setLoadingAuth(true);
        return;
      }

      if (!isAuthenticated) {
        router.push("/auth/login");
      } else {
        setLoadingAuth(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, router, pathname]);

  const toggleTheme = () => {
    const newColorScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newColorScheme);
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

          {loadingAuth && (
            <Center style={{ height: "100vh" }}>
              <Loader size="lg" />
            </Center>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    layout,
                    colorScheme,
                    toggleTheme,
                    //eslint-disable-next-line
                  } as any)
                : child
            )}
          </Suspense>
        </MantineProvider>
      </body>
    </html>
  );
}
