"use client";

import { useEffect } from "react";
import {
  Title,
  Button,
  Stack,
  Text,
  Select,
  ActionIcon,
  Group,
  Card,
  Container,
  Divider,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useGitHubStore } from "@/store/githubStore";
import { toast } from "react-toastify";

interface SettingsProps {
  colorScheme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Settings({ colorScheme, toggleTheme }: SettingsProps) {
  const { searchedUsername, clearData, layout, setLayout } = useGitHubStore();

  useEffect(() => {
    const savedLayout = localStorage.getItem("layoutPreference") as
      | "compact"
      | "comfortable"
      | null;
    if (savedLayout) setLayout(savedLayout);
  }, [setLayout]);

  const handleLayoutChange = (value: string | null) => {
    if (value === "compact" || value === "comfortable") {
      setLayout(value);
      localStorage.setItem("layoutPreference", value);
      toast.success(`Layout changed to ${value}`);
    }
  };

  const handleClearData = () => {
    clearData();
    toast.success("GitHub data cleared");
  };

  return (
    <Container size="sm" mb="xl" className="mt-30">
      <Title order={2} mb="lg" c="gray">
        Settings
      </Title>

      <Card shadow="sm" p="xl" withBorder>
        <Stack gap="md">
          <Group gap="apart">
            <Text size="md" w={500}>
              Current Searched User: {searchedUsername || "None"}
            </Text>
          </Group>

          <Divider my="md" />

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

          <Divider my="md" />

          <Group gap="apart" align="center">
            <Text size="md" w={500}>
              Theme: {colorScheme === "light" ? "Light" : "Dark"}
            </Text>
            <ActionIcon
              onClick={toggleTheme}
              variant="outline"
              size="lg"
              aria-label="Toggle theme"
              color={colorScheme === "light" ? "yellow" : "blue"}
            >
              {colorScheme === "light" ? (
                <IconMoon size={18} />
              ) : (
                <IconSun size={18} />
              )}
            </ActionIcon>
          </Group>

          <Divider my="md" />

          <Button
            onClick={handleClearData}
            color="red"
            variant="outline"
            fullWidth
          >
            Clear GitHub Data
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}
