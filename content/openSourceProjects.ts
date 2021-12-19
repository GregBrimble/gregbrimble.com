import { OpenSourceProjectStatus } from "~/components/OpenSourceProject";

interface OpenSourceProject {
  status: OpenSourceProjectStatus;
  href: string;
  date: string;
  title: string;
  description: string;
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    title: "wrangler",
    href: "https://github.com/cloudflare/wrangler2",
    status: OpenSourceProjectStatus.active,
    description: "wrangler 2.0, the CLI for managing Cloudflare Workers.",
    date: "2021–2022",
  },
  {
    title: "Workers Types",
    href: "https://github.com/cloudflare/workers-types",
    status: OpenSourceProjectStatus.active,
    description:
      "TypeScript type definitions for authoring Cloudflare Workers.",
    date: "2019–2022",
  },
  {
    title: "Homebrew",
    href: "https://github.com/Homebrew/brew",
    status: OpenSourceProjectStatus.active,
    description: "The missing package manager for macOS (or Linux).",
    date: "2021–2022",
  },
  {
    title: "kv-orm",
    href: "https://github.com/kv-orm/core",
    status: OpenSourceProjectStatus.active,
    description:
      "A Node.js ORM (object relational mapper) for key-value datastores.",
    date: "2018–2022",
  },
  {
    title: "kv-orm Cloudflare Workers",
    href: "https://github.com/kv-orm/cf-workers",
    status: OpenSourceProjectStatus.maintained,
    description: "A datastore plugin for kv-orm for Cloudflare Workers KV.",
    date: "2019–2022",
  },
  {
    title: "kv-orm Cloudflare Workers Example",
    href: "https://github.com/GregBrimble/kv-orm-cf-workers-example",
    status: OpenSourceProjectStatus.active,
    description: "An example showcasing kv-orm running on Cloudflare Workers.",
    date: "2019–2022",
  },
  {
    title: "remix.pages.dev",
    href: "https://github.com/GregBrimble/remix.pages.dev",
    status: OpenSourceProjectStatus.maintained,
    description: "Remix on Cloudflare Pages.",
    date: "2021",
  },
  {
    title: "images.pages.dev",
    href: "https://github.com/cloudflare/images.pages.dev",
    status: OpenSourceProjectStatus.maintained,
    description: "Image sharing platform build with Cloudflare Pages.",
    date: "2021",
  },
  {
    title: "The 2021 Web Almanac",
    href: "https://almanac.httparchive.org/en/2021/structured-data",
    status: OpenSourceProjectStatus.completed,
    description:
      "Analysis for the Structured Data chapter of the 2021 Web Alamanc by HTTP Archive.",
    date: "2021",
  },
  {
    title: "The 2020 Web Almanac",
    href: "https://almanac.httparchive.org/en/2020/cms",
    status: OpenSourceProjectStatus.completed,
    description:
      "Analysis for the CMS chapter of the 2020 Web Alamanc by HTTP Archive.",
    date: "2020",
  },
  {
    title: "gregbrimble.com",
    href: "https://github.com/GregBrimble/gregbrimble.com",
    status: OpenSourceProjectStatus.maintained,
    description: `Personal website of Greg Brimble, Technological Engineer.`,
    date: "2014–2022",
  },
  {
    title: "Functional Reasoner for Acquiring Novel Knowledge (FRANK)",
    href: "https://github.com/frank-lab-ai/franky",
    status: OpenSourceProjectStatus.completed,
    description:
      "A question-answering system capable of inferring new facts from its knowledge graph sources.",
    date: "2020–2021",
  },
  {
    title: "Cloudflare Workers Discord Bot",
    href: "https://github.com/cloudflare-workers-community/cloudflare-workers-discord-bot",
    status: OpenSourceProjectStatus.active,
    description: "A bot for the Cloudflare Workers Discord server.",
    date: "2021–2022",
  },
  {
    title: "Cloudflare Workers Git Gateway",
    href: "https://github.com/glenstack/glenstack/tree/master/packages/cf-workers-git-gateway",
    status: OpenSourceProjectStatus.active,
    description: "Perform git actions from within a Cloudflare Worker.",
    date: "2020–2022",
  },
  {
    title: "Cloudflare Workers GraphQL",
    href: "https://github.com/glenstack/glenstack/tree/master/packages/cf-workers-graphql",
    status: OpenSourceProjectStatus.active,
    description: "A lightweight GraphQL Server for Cloudflare Workers.",
    date: "2020–2022",
  },
  {
    title: "Cloudflare Workers Access",
    href: "https://github.com/glenstack/glenstack/tree/master/packages/cf-workers-access",
    status: OpenSourceProjectStatus.maintained,
    description:
      "Authenticate with Cloudflare Access from within a Cloudflare Worker.",
    date: "2020",
  },
  {
    title: "Cloudflare Workers Discord Bot",
    href: "https://github.com/glenstack/glenstack/tree/master/packages/cf-workers-discord-bot",
    status: OpenSourceProjectStatus.active,
    description: "Interact with Discord from within Cloudflare Workers.",
    date: "2021–2022",
  },
  {
    title: "Cloudflare Workers Algolia Search",
    href: "https://github.com/glenstack/glenstack/tree/master/packages/cf-workers-algolia-search",
    status: OpenSourceProjectStatus.maintained,
    description: "An Algolia search client for Cloudflare Workers.",
    date: "2021",
  },
  {
    title: "Cloudflare Workers hCaptcha",
    href: "https://github.com/glenstack/glenstack/tree/master/packages/cf-workers-hcaptcha",
    status: OpenSourceProjectStatus.maintained,
    description: "Verify a hCaptcha token from within a Cloudflare Worker.",
    date: "2020",
  },
  {
    title: "Cloudflare Workers Router",
    href: "https://github.com/glenstack/glenstack/tree/master/packages/cf-workers-router",
    status: OpenSourceProjectStatus.maintained,
    description: "A router for Cloudflare Workers.",
    date: "2020",
  },
  {
    title: "Cloudflare Workers Function Memoizer",
    href: "https://github.com/glenstack/glenstack/tree/master/packages/cf-workers-function-memoizer",
    status: OpenSourceProjectStatus.maintained,
    description:
      "A wrapper which utilizes Cloudflare Workers KV to memoize a function.",
    date: "2020",
  },
  {
    title: "Cloudflare Workers Fetch Helpers",
    href: "https://github.com/glenstack/glenstack/tree/master/packages/cf-workers-fetch-helpers",
    status: OpenSourceProjectStatus.maintained,
    description: "A collection of chainable helpers to adapt the Fetch API.",
    date: "2020",
  },
  {
    title: "Cloudflare Workers CustomEvent",
    href: "https://github.com/glenstack/glenstack/tree/master/packages/cf-workers-customevent",
    status: OpenSourceProjectStatus.maintained,
    description:
      "A polyfill CustomEvent implementation for Cloudflare Workers.",
    date: "2020",
  },
  {
    title: "wait-until-all",
    href: "https://github.com/GregBrimble/wait-until-all",
    status: OpenSourceProjectStatus.maintained,
    description:
      "A Promise registration and execution utility, useful within a FetchEvent context.",
    date: "2020",
  },
  {
    title: "Linc FAB Action",
    href: "https://github.com/GregBrimble/linc-fab-action",
    status: OpenSourceProjectStatus.maintained,
    description: "A GitHub Action to build and upload FABs to Linc.",
    date: "2020",
  },
  {
    title: "TailwindUI Crawler Action",
    href: "https://github.com/GregBrimble/tailwindui-crawler-action",
    status: OpenSourceProjectStatus.maintained,
    description:
      "A GitHub Action to automate the crawling and cataloging of the Tailwind UI components into a private GitHub repository.",
    date: "2020",
  },
  {
    title: "Cloudflare Workers Typescript Template",
    href: "https://github.com/GregBrimble/cf-workers-typescript-template",
    status: OpenSourceProjectStatus.maintained,
    description: "A template Cloudflare Workers Typescript server & client.",
    date: "2020",
  },
  {
    title: "Typescript Template",
    href: "https://github.com/GregBrimble/typescript-template",
    status: OpenSourceProjectStatus.maintained,
    description:
      "A template Typescript project with Prettier and Jest built-in.",
    date: "2019–2021",
  },
  {
    title: "Dark Static Assets Action",
    href: "https://github.com/GregBrimble/dark-static-assets-action",
    status: OpenSourceProjectStatus.maintained,
    description:
      "A GitHub Action to upload static assets to a Dark (darklang) canvas.",
    date: "2019",
  },
  {
    title: "workers.sh",
    href: "https://workers.sh/",
    status: OpenSourceProjectStatus.icebox,
    description: "A featureful dashboard for managing Cloudflare Workers.",
    date: "2020",
  },
  {
    title: "Typed Tables",
    href: "https://www.youtube.com/watch?v=I31QyCll80w",
    status: OpenSourceProjectStatus.icebox,
    description:
      "A follow-up to 'Leveraging the Power of a Typed Schema: Dynamic User Interfaces with GraphQL'.",
    date: "",
  },
  {
    title:
      "Leveraging the Power of a Typed Schema: Dynamic User Interfaces with GraphQL",
    href: "https://www.youtube.com/watch?v=I31QyCll80w",
    status: OpenSourceProjectStatus.completed,
    description: "A talk presented at Byteconf GraphQL 2020.",
    date: "2020",
  },
  {
    title: "Unary",
    href: "https://unary.gregbrimble.com/",
    status: OpenSourceProjectStatus.icebox,
    description:
      "A weekly software engineering and technology newsletter featuring a single item from each category (hence Unary).",
    date: "2019",
  },
  {
    title: "helpe.rs",
    href: "https://helpe.rs/",
    status: OpenSourceProjectStatus.icebox,
    description:
      "Personal productivity tools inspired by software development processes.",
    date: "2018",
  },
  {
    title: "Remix Starter for Cloudflare Workers",
    href: "https://github.com/GregBrimble/remix-beta-on-workers",
    status: OpenSourceProjectStatus.archived,
    description: "A proof-of-concept of Remix running on Cloudflare Workers.",
    date: "2021",
  },
  {
    title: "VSCode Workers",
    href: "https://github.com/glenstack/vscode-workers",
    status: OpenSourceProjectStatus.archived,
    description: "Visual Studio Code running on Cloudflare Workers.",
    date: "2020",
  },
  {
    title: "Wrangler Cloudflared Template",
    href: "https://github.com/GregBrimble/wrangler-cloudflared-template",
    status: OpenSourceProjectStatus.archived,
    description:
      "A template repo demonstrating Wrangler's new local development server, working with a cloudflared tunnel. Superceded by 'Cloudflare Workers Typescript Template'.",
    date: "2020",
  },
  {
    title: "contributeto.tech",
    href: "https://github.com/GregBrimble/contributeto.tech",
    status: OpenSourceProjectStatus.archived,
    description:
      "A hackathon submission to HackUPC: recommends repositories and their open issues to first-time contributors to open-source.",
    date: "2018",
  },
  {
    title: "DreamHost Runner",
    href: "https://github.com/GregBrimble/dreamhost-runner",
    status: OpenSourceProjectStatus.archived,
    description:
      "A wrapper for running a Python application on DreamHost's shared server.",
    date: "2017",
  },
  {
    title: "Boilerplate Web Service",
    href: "https://github.com/GregBrimble/boilerplate-web-service",
    status: OpenSourceProjectStatus.archived,
    description: "A template Python web application.",
    date: "2017",
  },
  {
    title: "WSGI Micro Web Framework",
    href: "https://github.com/GregBrimble/wsgi-micro-web-framework",
    status: OpenSourceProjectStatus.archived,
    description:
      "A tiny WSGI-compatible micro web framework written in Python.",
    date: "2016",
  },
];
