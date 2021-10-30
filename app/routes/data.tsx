import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { CurrentlyListingTo } from "~/components/data/CurrentlyListingTo";
import type { Context } from "../../data";
import type { Track } from "../../data/music";

interface LoaderData {
  currentTrack?: Track;
  recentTracks?: Track[];
}

export const loader: LoaderFunction = async ({
  context,
}: {
  context: Context;
}): Promise<LoaderData> => {
  return {
    currentTrack: await context.clients.music.getCurrentTrack(),
    recentTracks: await context.clients.music.getRecentTracks(),
  };
};

export default function OpenSource() {
  const { currentTrack, recentTracks } = useLoaderData<LoaderData>();

  return (
    <div>
      {currentTrack ? (
        <CurrentlyListingTo
          currentTrack={currentTrack}
          recentTracks={recentTracks}
        />
      ) : (
        <>TODO</>
      )}
    </div>
  );
}
