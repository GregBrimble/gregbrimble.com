import { MetaFunction, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { CurrentlyListingTo } from "~/components/data/CurrentlyListingTo";
import { RecentTracks } from "~/components/data/RecentTracks";
import { Context } from "~/types";
import type { Track } from "~/data/music";
import type { Commit } from "~/data/code";
import { RecentCommits } from "~/components/data/Commits";

interface LoaderData {
  currentTrack?: Track;
  recentTracks?: Track[];
  recentCommits?: Commit[];
}

export const loader: LoaderFunction = async ({
  context,
}: {
  context: Context;
}): Promise<LoaderData> => {
  return {
    currentTrack: await context.clients.music.getCurrentTrack(),
    recentTracks: await context.clients.music.getRecentTracks(),
    recentCommits: await context.clients.code.getRecentCommits(),
  };
};

export const meta: MetaFunction = () => {
  return {
    title: "Data | Greg Brimble",
    description: "The personal and open data of Greg Brimble.",
  };
};

export default function Data() {
  const { currentTrack, recentTracks, recentCommits } =
    useLoaderData<LoaderData>();

  const gridChildren = [
    recentTracks && !currentTrack && (
      <RecentTracks tracks={recentTracks} key="Recent Tracks" />
    ),
    recentCommits && (
      <RecentCommits commits={recentCommits} key="Recent Commits" />
    ),
  ].filter(Boolean);

  return (
    <div>
      <div className="pt-16 px-4 sm:px-6 lg:pt-24 lg:px-8">
        <div className="max-w-lg mx-auto lg:max-w-7xl">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Data
          </h2>
        </div>
      </div>

      {currentTrack && (
        <CurrentlyListingTo
          currentTrack={currentTrack}
          recentTracks={recentTracks}
        />
      )}

      <div className="pt-12 px-4 sm:px-6 lg:pt-18 lg:px-8">
        <div
          className={`max-w-lg mx-auto lg:max-w-7xl grid gap-6 ${
            gridChildren.length > 1 ? "lg:grid-cols-2" : ""
          }`}
        >
          {gridChildren}
        </div>
      </div>
    </div>
  );
}
