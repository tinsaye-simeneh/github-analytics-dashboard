"use client";
import { useState, useEffect } from "react";
import { Card, Image, Text, Title } from "@mantine/core";
import { toast } from "react-toastify";
import SkeletonLoading from "@/components/shared/SkeletonLoading";

export default function Overview() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: GitHubUser = await response.json();
        setUser(data);
        toast.success("User data loaded");
      } catch (err: any) {
        setError(err.message || "Failed to load user data");
        toast.error(err.message || "Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return <SkeletonLoading type="profile" />;
  if (error) return <Text color="red">{error}</Text>;

  return (
    <div>
      <Title order={2} mb="lg">
        Overview
      </Title>
      {user && (
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
      )}
    </div>
  );
}
