"use client";
import { Button, Group } from "@mantine/core";

interface NavbarProps {
  toggleTheme: () => void;
}

export default function Navbar({ toggleTheme }: NavbarProps) {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f8f9fa" }}>
      <Group justify="space-between">
        <div>GitHub Analytics</div>
        <Button onClick={toggleTheme}>Toggle Theme</Button>
      </Group>
    </nav>
  );
}
