"use client";
import { useState, useEffect } from "react";
import { Title, Button } from "@mantine/core";
import { toast } from "react-toastify";
import { useGitHubStore } from "@/store/githubStore";
import EntityTable from "@/components/shared/EntityTable";
import SkeletonLoading from "@/components/shared/SkeletonLoading";
import NoData from "@/components/shared/NoData";
import { useRouter } from "next/navigation";
import { GitHubRepo } from "@/lib/types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

export default function Repositories() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { searchedUsername, repos, fetchRepos } = useGitHubStore();
  const router = useRouter();
  const [languageData, setLanguageData] = useState<{ [key: string]: number }>(
    {}
  );

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

  useEffect(() => {
    if (repos.length > 0) {
      const languageCount: { [key: string]: number } = {};

      repos.forEach((repo: GitHubRepo) => {
        if (repo.language) {
          languageCount[repo.language] =
            (languageCount[repo.language] || 0) + 1;
        }
      });

      setLanguageData(languageCount);
    }
  }, [repos]);

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

  if (!searchedUsername) {
    return (
      <div className="flex justify-center items-center h-full">
        <NoData
          title="Please search for a user first"
          description="Use the search bar to find a GitHub user"
          onGoBack={() => router.push("/dashboard/home")}
        />
      </div>
    );
  }

  if (loading && repos.length === 0)
    return (
      <div className="px-10 pt-20">
        <SkeletonLoading />
      </div>
    );

  if (repos.length === 0) {
    return (
      <NoData
        title="No Repositories Found"
        description="The user has no public repositories or we couldn't fetch the data."
        onRetry={handleLoadMore}
      />
    );
  }

  const chartData = {
    labels: Object.keys(languageData),
    datasets: [
      {
        label: "Repositories per Language",
        data: Object.values(languageData),
        backgroundColor: "#F2AB4E",
        borderColor: "#354148",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="pr-5 pl-14 mt-20">
      <Title order={4} mb="sm">
        Repositories
      </Title>

      <div className="mb-4" style={{ height: "200px", width: "400px" }}>
        <Bar data={chartData} />
      </div>

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
