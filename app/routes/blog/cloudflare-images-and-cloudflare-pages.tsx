import * as CloudflareImagesAndCloudflarePages from "~/content/blog/cloudflare-images-and-cloudflare-pages/index.mdx";
import { generateNewsletterIssue } from "~/utils/blog/generateNewsletterIssue";

const NewsletterIssue = generateNewsletterIssue(
  CloudflareImagesAndCloudflarePages
);

export const links = NewsletterIssue.links;
export const loader = NewsletterIssue.loader;
export const meta = NewsletterIssue.meta;
export const indexLoader = NewsletterIssue.indexLoader;
export default NewsletterIssue.default;
