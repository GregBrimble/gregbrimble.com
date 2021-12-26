interface CloudflareStreamVideo {
  uid: string;
  thumbnail: string;
  thumbnailTimestampPct: number;
  readyToStream: boolean;
  status: {
    state: string;
    pctComplete?: string;
    errorReasonCode: string;
    errorReasonText: string;
  };
  meta: {
    name: string;
  };
  created: string;
  modified: string;
  size: number;
  preview: string;
  allowedOrigins: string[];
  requireSignedURLs: boolean;
  uploaded: string;
  uploadExpiry: null | string;
  maxSizeBytes: unknown; // TODO
  maxDurationSeconds: null | string;
  duration: number;
  input: {
    width: number;
    height: number;
  };
  playback: {
    hls: string;
    dash: string;
  };
  watermark: unknown; // TODO
  liveInput: string;
}

interface CloudflareStreamVideosResponse {
  result: CloudflareStreamVideo[];
}

export interface Video {
  name: string;
}

const mapCloudflareStreamVideo = async ({
  meta: { name },
}: CloudflareStreamVideo): Promise<Video> => ({
  name,
});

export class Videos {
  token: string;
  accountID = "5a883b414d4090a1442b20361f3c43a9";
  liveInputID = "4f5c9275b51fa2a00f3102aa9d733dbf";

  constructor(token: string) {
    this.token = token;
  }

  async getLiveVideo() {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${this.accountID}/stream/live_inputs/${this.liveInputID}/videos`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      const {
        result: [video],
      } = (await response.json()) as CloudflareStreamVideosResponse;

      const isLive = video.status.state === "live-inprogress";
      if (isLive) return await mapCloudflareStreamVideo(video);
    } catch {}
  }

  async getSchedule() {
    try {
      const response = await fetch(
        "https://api.twitch.tv/helix/schedule/icalendar?broadcaster_id=613488943"
      );
      const ical = await response.text();
    } catch {}
  }
}
