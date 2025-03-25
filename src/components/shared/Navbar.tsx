"use client";

import { Box, Group, Button, Menu, Text, ActionIcon } from "@mantine/core";
import { useAuthStore } from "@/store/authstore";
import { useRouter } from "next/navigation";
import ThemeToggler from "./ThemeToggler";
import { IconUser, IconMenu2, IconSun, IconMoon } from "@tabler/icons-react";

interface NavbarProps {
  toggleTheme: () => void;
  colorScheme: "light" | "dark";
}

const Navbar = ({ toggleTheme, colorScheme }: NavbarProps) => {
  const router = useRouter();
  const { isAuthenticated, username, logout } = useAuthStore();

  const menuItems = isAuthenticated
    ? [
        { label: "Dashboard", path: "/dashboard/home" },
        { label: "Logout", path: "/auth/login", action: logout },
      ]
    : [{ label: "Login", path: "/auth/login" }];

  const handleMenuClick = (path: string, action?: () => void) => {
    if (action) action();
    router.push(path);
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
        <Text size="lg" fw={700} c="blue">
          GitHub Analytics
        </Text>

        <Group visibleFrom="md">
          {isAuthenticated && (
            <Group align="center" className="p-2" gap={4}>
              <IconUser size={18} color="black" />
              <Text size="sm" c="blue">
                {username}
              </Text>
            </Group>
          )}

          {menuItems.map((item) => (
            <Button
              key={item.label}
              color={item.label === "Logout" ? "red" : "blue"}
              variant="outline"
              onClick={() => handleMenuClick(item.path, item.action)}
            >
              {item.label}
            </Button>
          ))}

          <ThemeToggler toggleTheme={toggleTheme} colorScheme={colorScheme} />
        </Group>

        <Box hiddenFrom="md">
          <Menu shadow="md" width={150} position="bottom" withArrow>
            <Menu.Target>
              <ActionIcon variant="outline" size="lg">
                <IconMenu2 size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {isAuthenticated && (
                <>
                  <Menu.Label>
                    <Group align="center">
                      <IconUser size={18} />
                      <Text size="sm">{username}</Text>
                    </Group>
                  </Menu.Label>
                  <Menu.Divider />
                </>
              )}

              {menuItems.map((item) => (
                <Menu.Item
                  key={item.label}
                  color={item.label === "Logout" ? "red" : "blue"}
                  onClick={() => handleMenuClick(item.path, item.action)}
                >
                  {item.label}
                </Menu.Item>
              ))}

              <Menu.Divider />
              <Menu.Item
                onClick={toggleTheme}
                leftSection={
                  colorScheme === "light" ? (
                    <IconMoon size={18} />
                  ) : (
                    <IconSun size={18} />
                  )
                }
              >
                Theme
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
      </Group>
    </Box>
  );
};

export default Navbar;
