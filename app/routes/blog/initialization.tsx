import { generateNewsletterIssue } from "~/utils/blog/generateNewsletterIssue";

const NewsletterIssue = generateNewsletterIssue({
  canonical_url: "",
  description: "Look ma, a description!",
});

export const links = NewsletterIssue.links;
export const loader = NewsletterIssue.loader;
export const meta = NewsletterIssue.meta;
export default NewsletterIssue.default;
