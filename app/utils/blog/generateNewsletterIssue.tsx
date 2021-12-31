import type { LinksFunction, LoaderFunction, MetaFunction } from "remix";
import { useLoaderData } from "remix";
import type { IndexLoader } from "~/routes/blog";
import type { Context } from "~/types";
import type { Issue } from "~/data/newsletter";
import { NewsletterIssue } from "~/components/blog/NewsletterIssue";

const EXTRACT_ID_REGEXP = /-(\d+)$/i;

export const generateNewsletterIssue = ({
  slug,
  canonicalURL,
  description,
}: {
  slug: string;
  canonicalURL: string;
  description: string;
}) => {
  const id = canonicalURL.match(EXTRACT_ID_REGEXP)?.[1] as string;

  const links: LinksFunction = () => {
    const links = [];

    if (canonicalURL) links.push({ rel: "canonical", href: canonicalURL });

    return links;
  };

  interface LoaderData {
    title: string;
    publishedDate: string;
    html: string;
  }

  const loader: LoaderFunction = async ({
    context,
  }: {
    context: Context;
  }): Promise<LoaderData> => {
    const { title, publishedDate, html } =
      (await context.clients.newsletter.getIssue(id)) as Issue;

    return { title, publishedDate, html };
  };

  const meta: MetaFunction = ({ data: { title } }) => {
    return {
      title: `${title} | Greg Brimble`,
    };
  };

  const indexLoader: IndexLoader = async (context: Context) => {
    const { title, publishedDate } = (await context.clients.newsletter.getIssue(
      id
    )) as Issue;

    return {
      type: "NewsletterIssue",
      to: `/blog/${slug}`,
      title,
      description,
      publishedDate,
    };
  };

  const Component = () => {
    const { title, publishedDate, html } = useLoaderData<LoaderData>();

    return (
      <NewsletterIssue
        slug={slug}
        title={title}
        description={description}
        publishedDate={publishedDate}
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
