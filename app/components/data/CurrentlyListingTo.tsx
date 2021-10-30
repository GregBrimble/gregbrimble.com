import MusicNoteIcon from "@heroicons/react/solid/MusicNoteIcon";
import { ExternalLink } from "../ExternalLink";
import moment from "moment";

interface Track {
  name: string;
  url: string;
  image: string;
  artist: {
    name: string;
    url: string;
  };
  album: string;
  date?: string;
}

export const CurrentlyListingTo = ({
  currentTrack,
  recentTracks,
}: {
  currentTrack: Track;
  recentTracks?: Track[];
}) => {
  return (
    <div className="pt-16 lg:py-24">
      <div className="pb-16 bg-blue-600 dark:bg-blue-300 lg:pb-0 lg:z-10 lg:relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:pl-16 lg:pr-8 lg:grid lg:grid-cols-3 lg:gap-16">
          <div className="relative lg:-m-8">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1/2 bg-white dark:bg-gray-900 lg:hidden"
            />
            <div className="mx-auto max-w-md px-4 lg:max-w-full sm:px-6 lg:p-0 lg:h-full">
              <div className="aspect-w-1 aspect-h-1 rounded-xl shadow-xl overflow-hidden lg:h-full">
                <ExternalLink href={currentTrack.url}>
                  <img
                    className="object-cover h-full w-full"
                    src={currentTrack.image}
                    alt={`Artwork for ${currentTrack.name}`}
                  />
                </ExternalLink>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:max-w-none flex items-center h-full">
              <div className="lg:pt-12 lg:pb-8">
                <MusicNoteIcon className="absolute h-12 w-12 text-white dark:text-blue-900 opacity-25" />
                <MusicNoteIcon className="animate-ping-small h-12 w-12 text-blue-200 dark:text-blue-700 opacity-20" />

                <p className="mt-6 text-2xl font-medium text-white dark:text-blue-900 hover:underline">
                  <ExternalLink href={currentTrack.url}>
                    {currentTrack.name}
                  </ExternalLink>
                </p>

                <p className="mt-6 text-base font-medium text-white dark:text-blue-900 hover:underline">
                  <ExternalLink href={currentTrack.artist.url}>
                    {currentTrack.artist.name}
                  </ExternalLink>
                </p>
                <p className="text-base font-medium text-blue-100 dark:text-blue-800">
                  {currentTrack.album}
                </p>
                {recentTracks && (
                  <div className="mt-10 lg:mt-2 flex flex-col lg:block space-y-4 lg:space-x-6 max-w-full overflow-y-scroll whitespace-nowrap pb-3">
                    {recentTracks.map((track) => (
                      <div
                        className="flex lg:inline-flex items-center"
                        key={track.date}
                      >
                        <ExternalLink href={track.url}>
                          <img
                            src={track.image}
                            alt={`Artwork for ${track.name}`}
                            className="h-10 w-10 rounded-full"
                          />
                        </ExternalLink>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-white dark:text-blue-900 whitespace-nowrap hover:underline">
                            <ExternalLink href={track.url}>
                              {track.name}
                            </ExternalLink>
                          </p>
                          <p className="text-xs font-medium text-white dark:text-blue-900 whitespace-nowrap hover:underline">
                            <ExternalLink href={track.artist.url}>
                              {track.artist.name}
                            </ExternalLink>
                          </p>
                          <p className="text-xs text-blue-100 dark:text-blue-800 whitespace-nowrap">
                            {moment(track.date).fromNow()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
