import { Env } from "functions/[[path]]";

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
  context: EventContext<Env, any, any>;
  token?: string;

  constructor(context: EventContext<Env, any, any>) {
    this.context = context;
  }

  async getToken() {
    if (this.token) return this.token;
    this.token = (await this.context.env.GREGBRIMBLE_COM_SECRETS.get(
      "REVUE_API_TOKEN"
    )) as string;
    return this.token;
  }

  async debug() {
    return (await this.getToken()).length;
  }

  async getIssue(id: string) {
    try {
      const cachedIssue =
        await this.context.env.GREGBRIMBLE_COM_SECRETS.get<Issue>(
          `revue:issue:${id}`,
          "json"
        );
      if (cachedIssue) return cachedIssue;

      const response = await fetch(
        `https://www.getrevue.co/api/v2/issues/${id}`,
        {
          headers: { Authorization: `Token ${await this.getToken()}` },
        }
      );
      const {
        issue: [issue],
      } = (await response.json()) as RevueIssueResponse;

      const mappedIssue = await mapRevueIssue(issue);
      this.context.waitUntil(
        this.context.env.GREGBRIMBLE_COM_SECRETS.put(
          `revue:issue:${id}`,
          JSON.stringify(mappedIssue),
          {
            expirationTtl: 60 * 60,
          }
        )
      );
      return mappedIssue;
    } catch {}
  }
}
