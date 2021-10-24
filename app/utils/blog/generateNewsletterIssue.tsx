import type { LinksFunction, MetaFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { NewsletterIssue } from "~/components/blog/NewsletterIssue";

const EXTRACT_ID_REGEXP = /\-(\d+)$/i;

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

export const generateNewsletterIssue = ({
  canonical_url,
  description,
}: {
  canonical_url: string;
  description: string;
}) => {
  const id = canonical_url.match(EXTRACT_ID_REGEXP)?.[1];

  const links: LinksFunction = () => {
    const links = [];

    if (canonical_url) links.push({ rel: "canonical", href: canonical_url });

    return links;
  };

  const loader: LoaderFunction = async () => {
    try {
      // const response = await fetch(`https://www.getrevue.co/api/v2/issues/${id}`, { headers: { Authorization: `Token ${API_TOKEN}` } })
      // const {
      //   issue: [{ html, title, sent_at: date }],
      // } = await response.json()
      const {
        issue: [{ html, title, sent_at: date }],
      } = {
        issue: [
          {
            title: "Initialization",
            html:
              `<h3><p>Hello! 👋 Hopefully the first of many, but we all know how side-projects go.</p><p>Nothing too interesting for you today, sorry! This is primarily just a test of deliverability and figuring out how to write on Revue.</p><p>However, (blatently stealing <a href="https://twitter.com/rick_viscomi/status/1427303084074672144" target="_blank">Rick's idea</a>), I am going to stream myself as I fumble around the analysis for the Structured Data chapter of this year's <a href="https://httparchive.org/" target="_blank">HTTP Archive</a>'s <a href="https://almanac.httparchive.org/" target="_blank">Web Almanac</a>. Assuming I've set everything up correctly, we should be live tomorrow (Sunday, 5th September) at 1200 UTC on <a href="https://www.twitch.tv/gregbrimble/schedule?seriesID=63ca5912-192f-4425-bd6c-abaf7fc484bb" target="_blank">Twitch</a> and <a href="https://www.youtube.com/watch?v=BNAYe4Rn6s8" target="_blank">YouTube</a>. I'm guessing it will take about three hours to complete, but we'll see.</p><p>Getting dangerously close to my undergraduate project, the bulk of the work will be writing a script to parse JSON-LD from the 13 million webpages we scraped in July. There will also be some SQL and Google Sheets shenanigans sprinkled throughout.</p><p>If this sort of thing interests you, check out <a href="https://almanac.httparchive.org/en/2020/cms" target="_blank">last year's chapter on CMSs</a> which I also did the analysis for.</p><p>I have a couple of other ideas for projects I'd like to stream, so stay tuned for some more sessions in the near future.</p><p>Thanks for trying this out with me!</p><p>Greg<a href="https://www.getrevue.co/app/issues/current#" target="_blank"> </a></p></h3>\n` +
              "<hr>\n" +
              '<p><h2><strong>Watch me stream on </strong><a href="https://www.twitch.tv/gregbrimble/schedule?seriesID=63ca5912-192f-4425-bd6c-abaf7fc484bc" target="_blank"><strong>Twitch</strong></a><strong> or </strong><a href="https://www.youtube.com/watch?v=BNAYe4Rn6s8" target="_blank"><strong>YouTube</strong></a></h2><p>Tomorrow (Sunday, 5th September) at 1200 UTC.</p></p>\n',
            sent_at: "2021-09-04T20:18:48.390Z",
          },
        ],
      };

      return {
        html: html.slice(4),
        title,
        date,
      };
    } catch {}

    return new Response(null, { status: 404 });
  };

  const meta: MetaFunction = ({ data: { title } }) => {
    return {
      title: `${title} | Greg Brimble`,
    };
  };

  const Component = () => {
    const { html, title, date } = useLoaderData();

    return (
      <NewsletterIssue
        html={html}
        title={title}
        description={description}
        date={date}
      />
    );
  };

  return {
    links,
    loader,
    meta,
    default: Component,
  };
};
