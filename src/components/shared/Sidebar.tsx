"use client";
import { Box, Text, NavLink, Stack } from "@mantine/core";
import Link from "next/link";

export default function Sidebar() {
  const tabs = [
    { name: "Overview", path: "/dashboard" },
    { name: "Repositories", path: "/dashboard/repositories" },
    { name: "Activity", path: "/dashboard/activity" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <Box
      component="aside"
      w={250}
      h="100vh"
      bg="gray.0"
      style={{
        position: "fixed",
        top: 60,
        left: 0,
        borderRight: "1px solid",
        borderColor: "gray.2",
        zIndex: 999,
      }}
      p="md"
    >
      <Stack gap="xs">
        <Text size="xl" fw={700} mb="md">
          Dashboard
        </Text>
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            label={tab.name}
            component={Link}
            href={tab.path}
            variant="light"
            active={
              typeof window !== "undefined" &&
              window.location.pathname === tab.path
            }
          />
        ))}
      </Stack>
    </Box>
  );
}
