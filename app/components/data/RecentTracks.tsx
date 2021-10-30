import moment from "moment";
import type { Track } from "../../../data/music";
import { ExternalLink } from "../ExternalLink";

export const RecentTracks = ({ tracks }: { tracks: Track[] }) => {
  return (
    <div className="w-96">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {tracks.map((track) => (
          <li key={track.date} className="py-4">
            <div className="flex items-center space-x-3">
              <ExternalLink href={track.url}>
                <img
                  className="h-10 w-10 rounded-md"
                  src={track.image}
                  alt={`Artwork for ${track.name}`}
                />
              </ExternalLink>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <ExternalLink
                    href={track.url}
                    className="text-sm font-medium dark:text-white hover:underline"
                  >
                    {track.name}
                  </ExternalLink>

                  <time
                    className="text-sm text-gray-500 dark:text-gray-400"
                    dateTime={track.date}
                  >
                    {moment(track.date).fromNow()}
                  </time>
                </div>
                <ExternalLink
                  href={track.artist.url}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
                >
                  {track.artist.name}
                </ExternalLink>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
