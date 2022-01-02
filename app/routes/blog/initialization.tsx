import * as Initialization from "~/content/blog/initialization/index.mdx";
import { generateNewsletterIssue } from "~/utils/blog/generateNewsletterIssue";

const NewsletterIssue = generateNewsletterIssue(Initialization);

export const links = NewsletterIssue.links;
export const loader = NewsletterIssue.loader;
export const meta = NewsletterIssue.meta;
export const indexLoader = NewsletterIssue.indexLoader;
export default NewsletterIssue.default;
