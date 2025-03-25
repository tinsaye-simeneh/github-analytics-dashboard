"use client";
import { useEffect } from "react";
import {
  Card,
  Text,
  Title,
  Group,
  Button,
  Badge,
  Container,
  Grid,
  Paper,
  Avatar,
  Stack,
  Box,
} from "@mantine/core";
import { toast } from "react-toastify";
import {
  IconExternalLink,
  IconMapPin,
  IconBuilding,
} from "@tabler/icons-react";
import SkeletonLoading from "@/components/shared/SkeletonLoading";
import NoData from "@/components/shared/Nodata";
import { useGitHubStore } from "@/store/githubStore";
import { useRouter } from "next/navigation";

export default function Overview() {
  const { user, searchedUsername, fetchUser } = useGitHubStore();
  const router = useRouter();

  useEffect(() => {
    if (!searchedUsername || user) return;

    const loadUser = async () => {
      try {
        await fetchUser(searchedUsername);
        toast.success("User data loaded");
        //eslint-disable-next-line
      } catch (err: any) {
        toast.error(err.message || "Error fetching user data");
      }
    };
    loadUser();
  }, [searchedUsername, user, fetchUser]);

  if (!searchedUsername)
    return (
      <NoData
        title="Please search for a user first"
        description="Use the search bar to find a GitHub user"
        onGoBack={() => router.push("/dashboard/home")}
      />
    );
  if (!user) return <SkeletonLoading type="profile" />;

  return (
    <Container size="md" py="xl">
      <Stack align="center" gap="xl">
        <Title order={2}>Profile Overview</Title>

        <Card
          shadow="md"
          radius="lg"
          withBorder
          className="w-full max-w-2xl overflow-hidden"
        >
          <Card.Section className="bg-gray-50 p-6">
            <Group gap="sm" dir="column" align="center">
              <Avatar
                src={user.avatar_url}
                size={120}
                radius="xl"
                className="border-4 border-white shadow-lg"
              />
              <Title order={2} className="text-gray-800 mt-4">
                {user.name || user.login}
              </Title>
              {user.bio && (
                <Text size="md" color="gray" className="text-center max-w-md">
                  {user.bio}
                </Text>
              )}
            </Group>
          </Card.Section>

          <Card.Section className="p-6">
            <Grid gutter="md">
              <Grid.Col span={6}>
                <Paper p="md" radius="md" withBorder>
                  <Group gap="xs">
                    <IconMapPin size={18} color="gray" />
                    <Text size="sm">
                      <span className="font-semibold">Location:</span>{" "}
                      {user.location || "Not specified"}
                    </Text>
                  </Group>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper p="md" radius="md" withBorder>
                  <Group gap="xs">
                    <IconBuilding size={18} color="gray" />
                    <Text size="sm">
                      <span className="font-semibold">Company:</span>{" "}
                      {user.company || "Not specified"}
                    </Text>
                  </Group>
                </Paper>
              </Grid.Col>
            </Grid>

            <Stack gap="md" mt="md">
              {user.blog && (
                <Text size="sm">
                  <span className="font-semibold">Website:</span>{" "}
                  <a
                    href={user.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {user.blog}
                  </a>
                </Text>
              )}
              <Text size="sm">
                <span className="font-semibold">Email:</span>{" "}
                {user.email || "Private"}
              </Text>
              <Box size="sm">
                <span className="font-semibold">Hireable:</span>{" "}
                <Badge color={user.hireable ? "green" : "red"} size="sm">
                  {user.hireable ? "Yes" : "No"}
                </Badge>
              </Box>
            </Stack>

            <Group gap="lg" justify="center" mt="lg">
              <Paper p="sm" radius="md" withBorder>
                <Text size="sm" c="gray">
                  Repositories
                </Text>
                <Text fw={700}>{user.public_repos}</Text>
              </Paper>
              <Paper p="sm" radius="md" withBorder>
                <Text size="sm" color="gray">
                  Followers
                </Text>
                <Text fw={700}>{user.followers}</Text>
              </Paper>
              <Paper p="sm" radius="md" withBorder>
                <Text size="sm" color="gray">
                  Following
                </Text>
                <Text fw={700}>{user.following}</Text>
              </Paper>
            </Group>

            <Text size="xs" color="gray" mt="md">
              Joined {new Date(user.created_at).toLocaleDateString()}
            </Text>
          </Card.Section>
        </Card>

        <Button
          component="a"
          href={user.html_url}
          target="_blank"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan" }}
          rightSection={<IconExternalLink size={18} />}
          size="md"
        >
          Visit GitHub Profile
        </Button>
      </Stack>
    </Container>
  );
}
