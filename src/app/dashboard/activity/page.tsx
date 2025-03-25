"use client";
import { useEffect } from "react";
import { Title, Text } from "@mantine/core";
import { toast } from "react-toastify";
import { useGitHubStore } from "@/store/githubStore";
import EntityTable from "@/components/shared/EntityTable";
import SkeletonLoading from "@/components/shared/SkeletonLoading";
import { GitHubEvent } from "@/lib/types";

export default function Activity() {
  const { searchedUsername, events, fetchEvents } = useGitHubStore();

  useEffect(() => {
    if (!searchedUsername || events.length > 0) return;

    const loadEvents = async () => {
      try {
        await fetchEvents(searchedUsername);
        toast.success("Activity data loaded");
        //eslint-disable-next-line
      } catch (err: any) {
        toast.error(err.message || "Failed to load events");
      }
    };
    loadEvents();
  }, [searchedUsername, events.length, fetchEvents]);

  const columns = [
    { key: "type", header: "Event Type" },
    {
      key: "created_at",
      header: "Date",
      render: (item: GitHubEvent) => new Date(item.created_at).toLocaleString(),
    },
  ];

  if (!searchedUsername) return <Text>Please search for a user first.</Text>;
  if (events.length === 0 && !searchedUsername)
    return <SkeletonLoading type="activity" />;

  return (
    <div>
      <Title order={2} mb="lg">
        Activity
      </Title>
      <EntityTable data={events.slice(0, 10)} columns={columns} />{" "}
      {/* Limit to 10 events */}
    </div>
  );
}
