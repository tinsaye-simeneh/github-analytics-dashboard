"use client";

import { useState, useEffect } from "react";
import {
  Title,
  Button,
  Stack,
  Text,
  Select,
  ActionIcon,
  Group,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useGitHubStore } from "@/store/githubStore";
import { toast } from "react-toastify";

export default function Settings() {
  const { searchedUsername, clearData } = useGitHubStore();

  const [layout, setLayout] = useState<"compact" | "comfortable">(
    "comfortable"
  );
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedLayout = localStorage.getItem("layoutPreference") as
      | "compact"
      | "comfortable"
      | null;
    const savedTheme = localStorage.getItem("colorScheme") as
      | "light"
      | "dark"
      | null;

    if (savedLayout) setLayout(savedLayout);
    if (savedTheme) setColorScheme(savedTheme);
  }, []);

  const handleLayoutChange = (value: string | null) => {
    if (value === "compact" || value === "comfortable") {
      setLayout(value);
      localStorage.setItem("layoutPreference", value);
      toast.success(`Layout changed to ${value}`);
    }
  };

  const toggleTheme = () => {
    const newScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newScheme);
    localStorage.setItem("colorScheme", newScheme);
    toast.success(`Theme switched to ${newScheme} mode`);
  };

  const handleClearData = () => {
    clearData();
    toast.success("GitHub data cleared");
  };

  return (
    <div>
      <Title order={2} mb="lg">
        Settings
      </Title>
      <Stack gap="md">
        <Text>Current Searched User: {searchedUsername || "None"}</Text>

        <Select
          label="Layout Preference"
          value={layout}
          onChange={handleLayoutChange}
          data={[
            { value: "comfortable", label: "Comfortable View" },
            { value: "compact", label: "Compact View" },
          ]}
          description="Choose how content is displayed"
        />

        <Group justify="space-between" align="center">
          <Text>Theme: {colorScheme === "light" ? "Light" : "Dark"}</Text>
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

        <Button
          onClick={handleClearData}
          color="red"
          variant="outline"
          fullWidth={false}
        >
          Clear GitHub Data
        </Button>
      </Stack>
    </div>
  );
}
