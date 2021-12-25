/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
// eslint-disable-next-line no-undef
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  serverBuildDirectory: "build",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: [".*"],
  mdx: async () => {
    const [rehypePrism, remarkMDXCodeMeta] = await Promise.all([
      import("rehype-highlight").then((mod) => mod.default),
      import("remark-mdx-code-meta").then((mod) => mod.remarkMdxCodeMeta),
    ]);

    return {
      remarkPlugins: [remarkMDXCodeMeta],
      rehypePlugins: [rehypePrism],
    };
  },
};
