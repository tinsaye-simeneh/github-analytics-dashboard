export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
}

export interface GitHubEvent {
  type: string;
  created_at: string;
}
