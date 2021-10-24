interface Issue {
  issue: [
    {
      title: string;
      html: string;
      sent_at: string;
      description: string;
      url: string;
    }
  ];
}

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
        issue: [{ html, title, sent_at: date }],
      } = (await response.json()) as Issue;

      return { html: html.slice(4), title, date };
    } catch {}
  }
}
