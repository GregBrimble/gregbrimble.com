/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  serverBuildDirectory: "build",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: [".*"],
  mdx: async (filename) => {
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
