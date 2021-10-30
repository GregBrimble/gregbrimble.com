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
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getIssue(id: string) {
    try {
      const response = await fetch(
        `https://www.getrevue.co/api/v2/issues/${id}`,
        {
          headers: { Authorization: `Token ${this.token}` },
        }
      );
      const {
        issue: [issue],
      } = (await response.json()) as RevueIssueResponse;

      return await mapRevueIssue(issue);
    } catch {}
  }
}
