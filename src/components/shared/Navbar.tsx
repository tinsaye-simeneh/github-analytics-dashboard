"use client";
import { Box, Text, Group, ActionIcon, Button } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useAuthStore } from "@/store/authstore";

interface NavbarProps {
  toggleTheme: () => void;
  colorScheme: "light" | "dark";
}

const Navbar = ({ toggleTheme, colorScheme }: NavbarProps) => {
  const { isAuthenticated } = useAuthStore();
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
        <Group>
          {isAuthenticated ? (
            <Group align="center">
              <Text size="sm" mr="sm">
                Welcome, {useAuthStore.getState().username}
              </Text>
              <Button
                color="gray"
                variant="outline"
                component="a"
                href="/dashboard"
              >
                Dashboard
              </Button>
              <Button
                color="gray"
                variant="outline"
                component="a"
                href="/login"
              >
                Logout
              </Button>
            </Group>
          ) : (
            <Button color="gray" variant="outline" component="a" href="/login">
              Login
            </Button>
          )}

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
    </Box>
  );
};

export default Navbar;
