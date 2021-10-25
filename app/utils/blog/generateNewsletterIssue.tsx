import type {
  LinksFunction,
  MetaFunction,
  LoaderFunction,
  AppLoadContext,
} from "remix";
import { useLoaderData } from "remix";
import { NewsletterIssue } from "~/components/blog/NewsletterIssue";
import { IndexLoader } from "~/routes/blog";

const EXTRACT_ID_REGEXP = /\-(\d+)$/i;

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

  const loader: LoaderFunction = async ({ context }) => {
    return await context.clients.newsletter.getIssue(id);
  };

  const meta: MetaFunction = ({ data: { title } }) => {
    return {
      title: `${title} | Greg Brimble`,
    };
  };

  const indexLoader: IndexLoader = async (context: AppLoadContext) => {
    const { title, date } = await context.clients.newsletter.getIssue(id);

    return {
      type: "NewsletterIssue",
      to: `/blog/${slug}`,
      title,
      description,
      date,
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
    indexLoader,
    default: Component,
  };
};
