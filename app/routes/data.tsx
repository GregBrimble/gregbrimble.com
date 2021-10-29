import { LoaderFunction, useLoaderData } from "remix";
import { CurrentlyListingTo } from "~/components/data/CurrentlyListingTo";

export const loader: LoaderFunction = async ({ context }) => {
  const tracks = await context.clients.music.getRecentTracks().map((track) => ({
    name: track.name,
    url: track.url,
    image: track.image[track.image.length - 1]["#text"],
    artist: { name: track.artist.name, url: track.artist.url },
    album: { name: track.album["#text"] },
    date: track.date?.uts,
  }));

  return { currentTrack: tracks[0], recentTracks: tracks.slice(1) };
};

export default function OpenSource() {
  const { currentTrack, recentTracks } = useLoaderData();

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
