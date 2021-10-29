interface Track {
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

interface RecentTracks {
  recenttracks: { track: Track[] };
}

export class Music {
  token: string;
  username = "gregbrimble";

  constructor(token: string) {
    this.token = token;
  }

  async getCurrentTrack() {
    try {
      const url = new URL(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&extended=1&format=json`
      );
      url.searchParams.set("user", this.username);
      url.searchParams.set("api_key", this.token);

      const response = await fetch(url.toString());
      const {
        recenttracks: {
          track: [track],
        },
      } = (await response.json()) as RecentTracks;

      if (track["@attr"]?.nowplaying === "true") return track;
    } catch {}
  }

  async getRecentTracks() {
    try {
      const url = new URL(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=5&extended=1&format=json`
      );
      url.searchParams.set("user", this.username);
      url.searchParams.set("api_key", this.token);

      const response = await fetch(url.toString());
      const {
        recenttracks: { track: tracks },
      } = (await response.json()) as RecentTracks;

      return tracks.filter((track) => track["@attr"]?.nowplaying !== "true");
    } catch {}
  }
}
