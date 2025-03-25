"use client";
import { Skeleton, Stack, Group, Box } from "@mantine/core";

interface SkeletonLoadingProps {
  type?: "profile" | "list" | "activity";
  count?: number;
}

export default function SkeletonLoading({
  type = "profile",
  count = 3,
}: SkeletonLoadingProps) {
  switch (type) {
    case "profile":
      return (
        <Stack gap="md">
          <Group>
            <Skeleton height={100} width={100} radius="md" />
            <Stack gap="xs" style={{ flex: 1 }}>
              <Skeleton height={20} width="60%" />
              <Skeleton height={16} width="80%" />
              <Skeleton height={16} width="40%" />
            </Stack>
          </Group>
        </Stack>
      );

    case "list":
      return (
        <Stack gap="md">
          {Array.from({ length: count }).map((_, index) => (
            <Box
              key={index}
              p="md"
              style={{
                border: "1px solid",
                borderColor: "gray.2",
                borderRadius: "4px",
              }}
            >
              <Skeleton height={20} width="70%" mb="sm" />
              <Skeleton height={16} width="90%" mb="xs" />
              <Group>
                <Skeleton height={16} width="20%" />
                <Skeleton height={16} width="20%" />
              </Group>
            </Box>
          ))}
        </Stack>
      );

    case "activity":
      return (
        <Stack gap="md">
          {Array.from({ length: count }).map((_, index) => (
            <Box
              key={index}
              p="md"
              style={{
                border: "1px solid",
                borderColor: "gray.2",
                borderRadius: "4px",
              }}
            >
              <Skeleton height={16} width="50%" mb="xs" />
              <Skeleton height={16} width="30%" />
            </Box>
          ))}
        </Stack>
      );

    default:
      return <Skeleton height={200} />;
  }
}
