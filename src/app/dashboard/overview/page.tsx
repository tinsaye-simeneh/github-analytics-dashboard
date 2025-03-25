"use client";
import { useEffect } from "react";
import { Card, Image, Text, Title } from "@mantine/core";
import { toast } from "react-toastify";
import SkeletonLoading from "@/components/shared/SkeletonLoading";
import { useGitHubStore } from "@/store/githubStore";

export default function Overview() {
  const { user, searchedUsername, fetchUser } = useGitHubStore();

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

  if (!searchedUsername) return <Text>Please search for a user first.</Text>;
  if (!user) return <SkeletonLoading type="profile" />;

  return (
    <div className="flex flex-col items-center">
      <Title order={2} mb="lg">
        Overview
      </Title>
      <Card shadow="sm" p="lg" withBorder>
        <Image
          src={user.avatar_url}
          alt="Avatar"
          width={100}
          height={100}
          radius="md"
        />
        <Title order={3} mt="md">
          {user.name}
        </Title>
        <Text>{user.bio}</Text>
        <Text>Repos: {user.public_repos}</Text>
        <Text>Followers: {user.followers}</Text>
        <Text>Following: {user.following}</Text>
      </Card>
    </div>
  );
}
