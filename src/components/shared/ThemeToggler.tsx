"use client";

import { ActionIcon } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

interface ThemeTogglerProps {
  toggleTheme: () => void;
  colorScheme: "light" | "dark";
}

const ThemeToggler = ({ toggleTheme, colorScheme }: ThemeTogglerProps) => {
  return (
    <ActionIcon
      onClick={toggleTheme}
      variant="outline"
      size="lg"
      aria-label="Toggle theme"
    >
      {colorScheme === "light" ? <IconMoon size={18} /> : <IconSun size={18} />}
    </ActionIcon>
  );
};

export default ThemeToggler;
