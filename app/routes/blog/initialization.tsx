import { generateNewsletterIssue } from "~/utils/blog/generateNewsletterIssue";

const NewsletterIssue = generateNewsletterIssue({
  slug: "initialization",
  canonicalURL:
    "https://newsletter.gregbrimble.com/issues/initialization-311387",
  description:
    "Greg tries his hand at writing a newsletter and streaming data analysis.",
});

export const links = NewsletterIssue.links;
export const loader = NewsletterIssue.loader;
export const meta = NewsletterIssue.meta;
export const indexLoader = NewsletterIssue.indexLoader;
export default NewsletterIssue.default;
