interface RevueIssue {
  title: string;
  description: string;
  sent_at: string;
  html: string;
  url: string;
}

interface RevueIssueResponse {
  issue: [RevueIssue];
}

export interface Issue {
  title: string;
  date: string;
  html: string;
}

const mapRevueIssue = async ({
  title,
  sent_at: date,
  html,
}: RevueIssue): Promise<Issue> => ({
  title,
  date,
  html: html.slice(4),
});

export class Newsletter {
  kv: KVNamespace;
  token?: string;

  constructor(kv: KVNamespace) {
    this.kv = kv;
  }

  async getToken() {
    if (this.token) return this.token;
    this.token = (await this.kv.get("REVUE_API_TOKEN")) || undefined;
    return this.token;
  }

  async getIssue(id: string) {
    try {
      const response = await fetch(
        `https://www.getrevue.co/api/v2/issues/${id}`,
        {
          headers: { Authorization: `Token ${await this.getToken()}` },
        }
      );
      const {
        issue: [issue],
      } = (await response.json()) as RevueIssueResponse;

      return await mapRevueIssue(issue);
    } catch {}
  }
}
