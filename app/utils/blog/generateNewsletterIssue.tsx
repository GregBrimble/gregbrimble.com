import type { LinksFunction, MetaFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import type { IndexLoader } from "~/routes/blog";
import type { Context } from "~/types";
import type { Issue } from "../../../data/newsletter";
import { NewsletterIssue } from "~/components/blog/NewsletterIssue";

const EXTRACT_ID_REGEXP = /-(\d+)$/i;

export const generateNewsletterIssue = ({
  slug,
  canonical_url,
  description,
}: {
  slug: string;
  canonical_url: string;
  description: string;
}) => {
  const id = canonical_url.match(EXTRACT_ID_REGEXP)?.[1] as string;

  const links: LinksFunction = () => {
    const links = [];

    if (canonical_url) links.push({ rel: "canonical", href: canonical_url });

    return links;
  };

  interface LoaderData {
    title: string;
    date: string;
    html: string;
  }

  const loader: LoaderFunction = async ({
    context,
  }: {
    context: Context;
  }): Promise<LoaderData> => {
    const { title, date, html } = (await context.clients.newsletter.getIssue(
      id
    )) as Issue;

    return { title, date, html };
  };

  const meta: MetaFunction = ({ data: { title } }) => {
    return {
      title: `${title} | Greg Brimble`,
    };
  };

  const indexLoader: IndexLoader = async (context: Context) => {
    const { title, date } = (await context.clients.newsletter.getIssue(
      id
    )) as Issue;

    return {
      type: "NewsletterIssue",
      to: `/blog/${slug}`,
      title,
      description,
      date,
    };
  };

  const Component = () => {
    const { title, date, html } = useLoaderData<LoaderData>();

    return (
      <NewsletterIssue
        slug={slug}
        title={title}
        description={description}
        date={date}
        html={html}
      />
    );
  };

  return {
    links,
    loader,
    meta,
    indexLoader,
    default: Component,
  };
};
