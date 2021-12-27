import { Env } from "functions/[[path]]";

const CACHE_DURATION = 60 * 3; // 3 minutes

interface LastFMTrack {
  artist: {
    url: string;
    name: string;
    image: [
      { size: "small"; "#text": string },
      { size: "medium"; "#text": string },
      { size: "large"; "#text": string },
      { size: "extralarge"; "#text": string }
    ];
  };
  image: [
    { size: "small"; "#text": string },
    { size: "medium"; "#text": string },
    { size: "large"; "#text": string },
    { size: "extralarge"; "#text": string }
  ];
  album: {
    "#text": string;
  };
  name: string;
  "@attr"?: { nowplaying: "true" };
  url: string;
  date?: { uts: string; "#text": string };
}

interface LastFMRecentTracksResponse {
  recenttracks: { track: LastFMTrack[] };
}

export interface Track {
  name: string;
  url: string;
  image: string;
  artist: { name: string; url: string };
  album: string;
  date?: string;
}

const mapLastFMTrack = async ({
  name,
  url,
  image,
  artist,
  album: { "#text": album },
  date,
}: LastFMTrack): Promise<Track> => ({
  name,
  url,
  image: image[image.length - 1]["#text"],
  artist: { name: artist.name, url: artist.url },
  album,
  date: date?.uts
    ? new Date(parseInt(date?.uts) * 1000).toISOString()
    : undefined,
});

export class Music {
  context: EventContext<Env, any, any>;
  key?: string;
  username = "gregbrimble";

  constructor(context: EventContext<Env, any, any>) {
    this.context = context;
  }

  async getKey() {
    if (this.key) return this.key;
    this.key = (await this.context.env.KV.get("LAST_FM_API_KEY")) as string;
    return this.key;
  }

  async getCurrentTrack() {
    try {
      const cachedTrack = await this.context.env.KV.get<Track | false>(
        "lastfm:currentTrack",
        "json"
      );
      if (cachedTrack !== null) {
        if (cachedTrack !== false) {
          return cachedTrack;
        }

        return undefined;
      }

      const url = new URL(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&extended=1&format=json`
      );
      url.searchParams.set("user", this.username);
      url.searchParams.set("api_key", await this.getKey());

      const response = await fetch(url.toString());
      const {
        recenttracks: {
          track: [track],
        },
      } = (await response.json()) as LastFMRecentTracksResponse;

      if (track["@attr"]?.nowplaying === "true") {
        const mappedTrack = await mapLastFMTrack(track);
        this.context.waitUntil(
          this.context.env.KV.put(
            "lastfm:currentTrack",
            JSON.stringify(mappedTrack),
            { expirationTtl: CACHE_DURATION }
          )
        );
        return mappedTrack;
      } else {
        this.context.waitUntil(
          this.context.env.KV.put(
            "lastfm:currentTrack",
            JSON.stringify(false),
            { expirationTtl: CACHE_DURATION }
          )
        );
      }
    } catch {}
  }

  async getRecentTracks() {
    try {
      const cachedTracks = await this.context.env.KV.get<Track[]>(
        "lastfm:recentTracks",
        "json"
      );
      if (cachedTracks) return cachedTracks;

      const url = new URL(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=5&extended=1&format=json`
      );
      url.searchParams.set("user", this.username);
      url.searchParams.set("api_key", await this.getKey());

      const response = await fetch(url.toString());
      const {
        recenttracks: { track: tracks },
      } = (await response.json()) as LastFMRecentTracksResponse;

      const mappedTracks = await Promise.all(
        tracks
          .filter((track) => track["@attr"]?.nowplaying !== "true")
          .map(mapLastFMTrack)
      );

      this.context.waitUntil(
        this.context.env.KV.put(
          "lastfm:recentTracks",
          JSON.stringify(mappedTracks),
          { expirationTtl: CACHE_DURATION }
        )
      );

      return mappedTracks;
    } catch {}
  }
}
