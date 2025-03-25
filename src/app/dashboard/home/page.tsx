"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Button, Stack, Title, Paper } from "@mantine/core";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { useGitHubStore } from "@/store/githubStore";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { fetchUser } = useGitHubStore();
  const { register, handleSubmit } = useForm<FieldValues>();

  const handleSearch: SubmitHandler<FieldValues> = async (data) => {
    const { username } = data;
    setLoading(true);

    try {
      await fetchUser(username);
      toast.success(`Found user: ${username}`);
      router.push("/dashboard/overview");
      //eslint-disable-next-line
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <Paper shadow="md" p="lg" withBorder style={{ width: 400 }}>
        <Title order={2} mb="md">
          Search GitHub User
        </Title>
        <form onSubmit={handleSubmit(handleSearch)}>
          <Stack gap="md">
            <TextInput
              label="GitHub Username"
              placeholder="Enter a GitHub username (e.g., octocat)"
              {...register("username", { required: true })}
              disabled={loading}
            />
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              fullWidth
            >
              Search
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
