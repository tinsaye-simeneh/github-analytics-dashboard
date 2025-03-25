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
import ThemeToggler from "@/components/shared/ThemeToggler";
import { useGitHubStore } from "@/store/githubStore";
import { toast } from "react-toastify";

interface SettingsProps {
  toggleTheme: () => void;
  colorScheme: "light" | "dark";
}

export default function Settings({ toggleTheme, colorScheme }: SettingsProps) {
  const { searchedUsername, clearData, layout, setLayout } = useGitHubStore();

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
            <ThemeToggler toggleTheme={toggleTheme} colorScheme={colorScheme} />
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
