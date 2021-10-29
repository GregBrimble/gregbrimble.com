import { generateNewsletterIssue } from "~/utils/blog/generateNewsletterIssue";

const NewsletterIssue = generateNewsletterIssue({
  slug: "cloudflare-images-and-cloudflare-pages",
  canonical_url:
    "https://newsletter.gregbrimble.com/issues/cloudflare-images-cloudflare-pages-749880",
  description:
    "A quick update on what I've been up to in the last month: Cloudflare Images, Cloudflare Pages, and the 2021 Web Almanac.",
});

export const links = NewsletterIssue.links;
export const loader = NewsletterIssue.loader;
export const meta = NewsletterIssue.meta;
export const indexLoader = NewsletterIssue.indexLoader;
export default NewsletterIssue.default;
