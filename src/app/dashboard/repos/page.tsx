"use client";
import { useState, useEffect } from "react";
import { GitHubRepo } from "@/lib/types";
import { Title } from "@mantine/core";
import { toast } from "react-toastify";
import EntityTable from "@/components/shared/EntityTable";
import SkeletonLoading from "@/components/shared/SkeletonLoading";

export default function Repositories() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const loadRepos = async () => {
    //   setLoading(true);
    //   try {
    //     const data = await fetchRepos("octocat", page);
    //     setRepos((prev) => [...prev, ...data]);
    //     toast.success(`Loaded page ${page} of repositories`);
    //   } catch (err) {
    //     toast.error("Failed to load repositories");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // loadRepos();
  }, [page]);

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

  if (loading && repos.length === 0) return <SkeletonLoading type="list" />;

  return (
    <div>
      <Title order={2} mb="lg">
        Repositories
      </Title>
      <EntityTable data={repos} columns={columns} />
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
