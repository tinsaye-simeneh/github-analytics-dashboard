"use client";
import { useState } from "react";
import { Box, Text, NavLink, Stack, Button } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const tabs = [
    { name: "Home", path: "/dashboard" },
    { name: "Overview", path: "/dashboard/overview" },
    { name: "Repositories", path: "/dashboard/repo" },
    { name: "Activity", path: "/dashboard/activity" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="light"
        size="sm"
        style={{
          position: "fixed",
          top: 60,
          left: isOpen ? 260 : 20,
          zIndex: 1000,
          transition: "left 0.3s ease",
        }}
      >
        {isOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
      </Button>

      <Box
        component="aside"
        w={isOpen ? 250 : 0}
        h="100vh"
        style={{
          position: "fixed",
          top: 60,
          left: 0,
          borderRight: isOpen ? "1px solid gray" : "none",
          overflow: "hidden",
          transition: "width 0.3s ease",
          zIndex: 999,
        }}
        p={isOpen ? "md" : 0}
      >
        {isOpen && (
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
                  variant="light"
                  active={isActive}
                  style={{
                    backgroundColor: isActive ? "#E0E0E0" : "transparent",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                />
              );
            })}
          </Stack>
        )}
      </Box>
    </>
  );
}
