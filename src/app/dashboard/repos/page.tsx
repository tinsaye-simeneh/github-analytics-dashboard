"use client";
import { useState, useEffect } from "react";
import { Title, Text, Button } from "@mantine/core";
import { toast } from "react-toastify";
import { useGitHubStore } from "@/store/githubStore";
import EntityTable from "@/components/shared/EntityTable";
import SkeletonLoading from "@/components/shared/SkeletonLoading";
import { GitHubRepo } from "@/lib/types";

export default function Repositories() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { searchedUsername, repos, fetchRepos } = useGitHubStore();

  useEffect(() => {
    if (!searchedUsername || repos.length > 0) return;

    const loadRepos = async () => {
      setLoading(true);
      try {
        await fetchRepos(searchedUsername, page);
        toast.success(`Loaded page ${page} of repositories`);
        //eslint-disable-next-line
      } catch (err: any) {
        toast.error(err.message || "Failed to load repositories");
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, [searchedUsername, page, fetchRepos, repos.length]);

  const columns = [
    { key: "name", header: "Name" },
    { key: "description", header: "Description" },
    { key: "language", header: "Language" },
    { key: "stargazers_count", header: "Stars" },
    {
      key: "updated_at",
      header: "Last Updated",
      render: (item: GitHubRepo) =>
        new Date(item.updated_at).toLocaleDateString(),
    },
  ];

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      await fetchRepos(searchedUsername!, page + 1);
      setPage((prev) => prev + 1);
      toast.success(`Loaded page ${page + 1} of repositories`);
      //eslint-disable-next-line
    } catch (err: any) {
      toast.error(err.message || "Failed to load more repositories");
    } finally {
      setLoading(false);
    }
  };

  if (!searchedUsername) return <Text>Please search for a user first.</Text>;
  if (loading && repos.length === 0) return <SkeletonLoading type="list" />;

  return (
    <div>
      <Title order={2} mb="lg">
        Repositories
      </Title>
      <EntityTable data={repos} columns={columns} />
      <Button
        onClick={handleLoadMore}
        loading={loading}
        mt="md"
        fullWidth={false}
        disabled={!searchedUsername || repos.length === 0}
      >
        Load More
      </Button>
    </div>
  );
}
