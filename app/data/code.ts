import { Env } from "functions/[[path]]";

const CACHE_DURATION = 60 * 10; // 10 minutes

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface GitHubSearchCommitsItem {
  url: string;
  sha: string;
  node_id: string;
  html_url: string;
  comments_url: string;
  commit: {
    url: string;
    author: {
      date: string;
      name: string;
      email: string;
    };
    committer: {
      date: string;
      name: string;
      email: string;
    };
    message: string;
    tree: {
      url: string;
      sha: string;
    };
    comment_count: number;
  };
  author: GitHubUser;
  committer: GitHubUser;
  parents: {
    url: string;
    html_url: string;
    sha: string;
  }[];
  repository: {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: GitHubUser;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
  };
  score: number;
}

interface GitHubSearchCommitsResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubSearchCommitsItem[];
}

export interface Commit {
  message: string;
  date: string;
  url: string;
  repository: { name: string; url: string };
}

const mapGitHubCommit = async ({
  commit: {
    message,
    committer: { date },
  },
  html_url: url,
  repository: { name, html_url: repository_url },
}: GitHubSearchCommitsItem): Promise<Commit> => ({
  message,
  date,
  url,
  repository: { name, url: repository_url },
});

export class Code {
  context: EventContext<Env, any, any>;

  constructor(context: EventContext<Env, any, any>) {
    this.context = context;
  }

  async getRecentCommits() {
    try {
      const cachedCommits = await this.context.env.KV.get<Commit[]>(
        "github:commits",
        "json"
      );
      if (cachedCommits) return cachedCommits;

      const url = new URL(
        "https://api.github.com/search/commits?q=author%3AGregBrimble%20committer%3AGregBrimble&sort=committer-date&per_page=5"
      );

      const response = await fetch(url.toString(), {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "gregbrimble.com",
        },
      });
      const { items: commits } =
        (await response.json()) as GitHubSearchCommitsResponse;

      const mappedCommits = await Promise.all(commits.map(mapGitHubCommit));

      this.context.waitUntil(
        this.context.env.KV.put(
          "github:commits",
          JSON.stringify(mappedCommits),
          { expirationTtl: CACHE_DURATION }
        )
      );

      return mappedCommits;
    } catch {}
  }
}
