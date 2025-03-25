"use client";
import { Title, Button, Stack, Text } from "@mantine/core";
import { useGitHubStore } from "@/store/githubStore";
import { toast } from "react-toastify";

export default function Settings() {
  const { searchedUsername, clearData } = useGitHubStore();

  const handleClearData = () => {
    clearData();
    toast.success("GitHub data cleared");
  };

  return (
    <div>
      <Title order={2} mb="lg">
        Settings
      </Title>
      <Stack spacing="md">
        <Text>Current Searched User: {searchedUsername || "None"}</Text>
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
