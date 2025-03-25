"use client";

import {
  Title,
  Button,
  Stack,
  Text,
  Select,
  Group,
  Card,
  Container,
  Divider,
} from "@mantine/core";
import { useGitHubStore } from "@/store/githubStore";
import { toast } from "react-toastify";

export default function Settings() {
  const {
    searchedUsername,
    clearData,
    layout,
    setLayout,
    colorScheme,
    setColorScheme,
  } = useGitHubStore();

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

  const handleThemeToggle = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return (
    <Container size="sm" mb="xl" className="md:mt-30 mt-22">
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
            {/* Directly use the handleThemeToggle */}
            <Button onClick={handleThemeToggle} variant="outline">
              Toggle Theme
            </Button>
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
