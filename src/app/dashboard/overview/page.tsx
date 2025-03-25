"use client";
import { useEffect } from "react";
import { Card, Image, Text, Title } from "@mantine/core";
import { toast } from "react-toastify";
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
    <div className="flex flex-col items-center mt-24">
      <Title order={2} mb="lg">
        Overview
      </Title>
      <Card shadow="sm" p="lg" withBorder>
        <Image
          src={user.avatar_url}
          alt="Avatar"
          width={20}
          height={20}
          className="w-20 h-20 rounded-full"
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
