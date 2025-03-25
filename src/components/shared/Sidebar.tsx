"use client";

import { useState } from "react";
import { Box, Text, NavLink, Stack, Button } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useGitHubStore } from "@/store/githubStore";

export default function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [isOpen, setIsOpen] = useState(!isMobile);
  const pathname = usePathname();
  const { colorScheme } = useGitHubStore();

  const tabs = [
    { name: "Home", path: "/dashboard/home" },
    { name: "Overview", path: "/dashboard/overview" },
    { name: "Repositories", path: "/dashboard/repos" },
    { name: "Activity", path: "/dashboard/activity" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  const handleRouteChange = () => {
    if (isMobile) setIsOpen(false);
  };

  return (
    <>
      {isMobile && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="light"
          size="sm"
          style={{
            position: "fixed",
            top: 70,
            left: isOpen ? 180 : 20,
            zIndex: 1000,
            transition: "left 0.3s ease",
          }}
        >
          {isOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </Button>
      )}

      <Box
        component="aside"
        w={isOpen ? 250 : isMobile ? 0 : 250}
        h="100vh"
        style={{
          position: "fixed",
          top: 60,
          left: 0,
          borderRight: "1px solid gray",
          overflow: "hidden",
          transition: "width 0.3s ease",
          zIndex: 999,
          backgroundColor: colorScheme === "dark" ? "#2A2A2A" : "#FFFFFF",
        }}
        p={isOpen ? "md" : 0}
      >
        <Stack gap="xs">
          <Text size="xl" fw={700} mb="md">
            Dashboard
          </Text>

          {tabs.map((tab) => {
            const isActive =
              pathname === tab.path || pathname.startsWith(`${tab.path}/`);
            return (
              <NavLink
                key={tab.name}
                label={tab.name}
                component={Link}
                href={tab.path}
                active={isActive}
                onClick={handleRouteChange}
                style={{
                  backgroundColor: isActive ? "#E0E0E0" : "transparent",
                  color: isActive ? "black" : "gray",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              />
            );
          })}
        </Stack>
      </Box>
    </>
  );
}
