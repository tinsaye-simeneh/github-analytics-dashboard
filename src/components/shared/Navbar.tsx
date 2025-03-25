"use client";

import { useState } from "react";
import { Box, Group, ActionIcon, Button, Drawer, Text } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useAuthStore } from "@/store/authstore";
import { useRouter } from "next/navigation";
import { IconUser } from "@tabler/icons-react";

interface NavbarProps {
  toggleTheme: () => void;
  colorScheme: "light" | "dark";
}

const Navbar = ({ toggleTheme, colorScheme }: NavbarProps) => {
  const router = useRouter();
  const { isAuthenticated, username, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menu = isAuthenticated
    ? [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Logout", path: "/auth/login", action: logout },
      ]
    : [{ label: "Login", path: "/auth/login" }];

  const handleMenuClick = (path: string, action?: () => void) => {
    if (action) action();
    router.push(path);
    setMobileMenuOpen(false);
  };

  return (
    <Box
      component="nav"
      h={60}
      px="md"
      bg="gray.1"
      style={{
        borderBottom: "1px solid",
        borderColor: "gray.2",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Group justify="space-between" align="center" style={{ height: "100%" }}>
        <Text size="lg" fw={700}>
          GitHub Analytics
        </Text>

        <Group visibleFrom="sm">
          {isAuthenticated && (
            <Group align="center">
              <IconUser size={18} />
              <Text size="sm">{username}</Text>
            </Group>
          )}

          {menu.map((item) => (
            <Button
              key={item.label}
              color={item.label === "Logout" ? "red" : "blue"}
              variant="outline"
              onClick={() => handleMenuClick(item.path, item.action)}
            >
              {item.label}
            </Button>
          ))}

          <ActionIcon
            onClick={toggleTheme}
            variant="outline"
            size="lg"
            aria-label="Toggle theme"
          >
            {colorScheme === "light" ? (
              <IconMoon size={18} />
            ) : (
              <IconSun size={18} />
            )}
          </ActionIcon>
        </Group>
      </Group>

      <Drawer
        opened={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Menu"
        padding="md"
        size="xs"
      >
        {isAuthenticated && (
          <Group dir="column" align="center">
            <IconUser size={18} />
            <Text size="sm">{username}</Text>
          </Group>
        )}

        <Group dir="column" gap="md">
          {menu.map((item) => (
            <Button
              key={item.label}
              color={item.label === "Logout" ? "red" : "blue"}
              variant="outline"
              fullWidth
              onClick={() => handleMenuClick(item.path, item.action)}
            >
              {item.label}
            </Button>
          ))}
        </Group>
      </Drawer>
    </Box>
  );
};

export default Navbar;
