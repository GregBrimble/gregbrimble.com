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
  kv: KVNamespace;
  key?: string;
  username = "gregbrimble";

  constructor(kv: KVNamespace) {
    this.kv = kv;
  }

  async getKey() {
    if (this.key) return this.key;
    this.key = (await this.kv.get("LAST_FM_API_KEY")) as string;
    return this.key;
  }

  async getCurrentTrack() {
    try {
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

      if (track["@attr"]?.nowplaying === "true")
        return await mapLastFMTrack(track);
    } catch {}
  }

  async getRecentTracks() {
    try {
      const url = new URL(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=5&extended=1&format=json`
      );
      url.searchParams.set("user", this.username);
      url.searchParams.set("api_key", await this.getKey());

      const response = await fetch(url.toString());
      const {
        recenttracks: { track: tracks },
      } = (await response.json()) as LastFMRecentTracksResponse;

      return await Promise.all(
        tracks
          .filter((track) => track["@attr"]?.nowplaying !== "true")
          .map(mapLastFMTrack)
      );
    } catch {}
  }
}
