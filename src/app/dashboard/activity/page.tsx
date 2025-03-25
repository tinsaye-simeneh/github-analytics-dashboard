"use client";
import { useEffect } from "react";
import { Title } from "@mantine/core";
import { toast } from "react-toastify";
import { useGitHubStore } from "@/store/githubStore";
import EntityTable from "@/components/shared/EntityTable";
import SkeletonLoading from "@/components/shared/SkeletonLoading";
import NoData from "@/components/shared/Nodata";
import { GitHubEvent } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function Activity() {
  const { searchedUsername, events, fetchEvents } = useGitHubStore();
  const router = useRouter();

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

  if (!searchedUsername) {
    return (
      <NoData
        title="Please search for a user first"
        description="Use the search bar to find a GitHub user"
        onGoBack={() => router.push("/dashboard/home")}
      />
    );
  }

  if (events.length === 0)
    return (
      <div className="px-10 pt-20">
        <SkeletonLoading />
      </div>
    );

  return (
    <div className="md:pl-14 px-5 pt-20">
      <Title order={2} mb="lg">
        Activity
      </Title>
      <EntityTable data={events.slice(0, 10)} columns={columns} />{" "}
    </div>
  );
}
