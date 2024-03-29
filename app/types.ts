import { LoaderFunction as RemixLoaderFunction } from "remix";
import { Music } from "~/data/music";
import { Newsletter } from "~/data/newsletter";
import { Videos } from "~/data/videos";
import { Code } from "~/data/code";

export interface Context {
  clients: {
    music: Music;
    newsletter: Newsletter;
    code: Code;
    videos: Videos;
  };
}

export type LoaderFunction = (
  args: Omit<Parameters<RemixLoaderFunction>[0], "context"> & {
    context: Context;
  }
) => ReturnType<RemixLoaderFunction>;

export type { LinksFunction, MetaFunction } from "remix";
