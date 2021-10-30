import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { CurrentlyListingTo } from "~/components/data/CurrentlyListingTo";
import { RecentTracks } from "~/components/data/RecentTracks";
import type { Context } from "../../data";
import type { Track } from "../../data/music";

interface LoaderData {
  currentTrack?: Track;
  recentTracks: Track[];
}

export const loader: LoaderFunction = async ({
  context,
}: {
  context: Context;
}): Promise<LoaderData> => {
  return {
    currentTrack: await context.clients.music.getCurrentTrack(),
    recentTracks: (await context.clients.music.getRecentTracks()) as Track[],
  };

  return {
    currentTrack: {
      artist: {
        url: "https://www.last.fm/music/Oscar+Scheller",
        name: "Oscar Scheller",
      },
      name: "Peach",
      image:
        "https://lastfm.freetls.fastly.net/i/u/300x300/8c77ba682ee2ead43e4f6d66d13d54b4.jpg",

      album: "Boys Cry",

      url: "https://www.last.fm/music/Oscar+Scheller/_/Peach",
    },
    recentTracks: [
      {
        artist: {
          url: "https://www.last.fm/music/Hippo+Campus",
          name: "Hippo Campus",
        },
        date: "1635587251",
        name: "Bad Dream Baby",
        image:
          "https://lastfm.freetls.fastly.net/i/u/300x300/134a686fe8c8d2a3a87191013a82de4e.png",
        url: "https://www.last.fm/music/Hippo+Campus/_/Bad+Dream+Baby",
        album: "Bad Dream Baby",
      },
      {
        artist: {
          url: "https://www.last.fm/music/Zuzu",
          name: "Zuzu",
        },
        date: "1635587049",

        name: "What You Want",
        image:
          "https://lastfm.freetls.fastly.net/i/u/300x300/59d099f0e85741f2f146938dd68cc3a2.png",

        url: "https://www.last.fm/music/Zuzu/_/What+You+Want",

        album: "What You Want",
      },
      {
        artist: {
          url: "https://www.last.fm/music/Vistas",
          name: "Vistas",
        },
        date: "1635586838",

        name: "Young Forever",
        image:
          "https://lastfm.freetls.fastly.net/i/u/300x300/05b061555785f5fdcddd93861eb5216b.jpg",

        url: "https://www.last.fm/music/Vistas/_/Young+Forever",

        album: "Young Forever",
      },
      {
        artist: {
          url: "https://www.last.fm/music/Young+Rising+Sons",
          name: "Young Rising Sons",
        },
        date: "1635586588",

        name: "Sunday Sunshine",
        image:
          "https://lastfm.freetls.fastly.net/i/u/300x300/4291cfc18259d569da9209d2d43ad610.jpg",

        url: "https://www.last.fm/music/Young+Rising+Sons/_/Sunday+Sunshine",

        album: "Sunday Sunshine",
      },
      {
        artist: {
          url: "https://www.last.fm/music/Foster+the+People",
          name: "Foster the People",
        },
        date: "1635586385",

        name: "Houdini",
        image:
          "https://lastfm.freetls.fastly.net/i/u/300x300/af29e149b06245e19ecb31a1871cc4c8.png",

        url: "https://www.last.fm/music/Foster+the+People/_/Houdini",

        album: "Torches",
      },
    ],
  };
};

export default function OpenSource() {
  const { currentTrack, recentTracks } = useLoaderData<LoaderData>();

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
        <div className="max-w-lg mx-auto lg:max-w-7xl">
          {!currentTrack && <RecentTracks tracks={recentTracks} />}
        </div>
      </div>
    </div>
  );
}
