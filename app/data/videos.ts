import { Env } from "functions/[[path]]";
import moment, { Moment } from "moment-timezone";
import { Rule, DateAdapter } from "~/utils/rschedule";

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

interface CloudflareStreamVideoResponse {
  result: CloudflareStreamVideo;
}

export interface Video {
  slug: string;
  title: string;
  image: {
    url: string;
  };
  width: number;
  height: number;
  iframeURL: string;
  uploadedDate: string;
  duration: string;
  quality: "4K" | "2K" | "1080p" | "720p" | "Unknown";
}

const mapCloudflareStreamVideo = async ({
  uid,
  meta: { name },
  thumbnail,
  uploaded,
  duration,
  input: { width, height },
}: CloudflareStreamVideo): Promise<Video> => ({
  slug: uid,
  title: name,
  image: { url: thumbnail },
  width,
  height,
  iframeURL: `https://iframe.videodelivery.net/${uid}?autoplay=true&primaryColor=%2393c5fd`,
  uploadedDate: uploaded,
  duration: moment.duration(duration, "seconds").toISOString(),
  quality:
    width === 3840
      ? "4K"
      : width === 2560
      ? "2K"
      : width === 1920
      ? "1080p"
      : width === 720
      ? "720p"
      : "Unknown",
});

export class Videos {
  context: EventContext<Env, any, any>;
  token?: string;
  accountID = "5a883b414d4090a1442b20361f3c43a9";
  liveInputID = "4f5c9275b51fa2a00f3102aa9d733dbf";

  constructor(context: EventContext<Env, any, any>) {
    this.context = context;
  }

  async getToken() {
    if (this.token) return this.token;
    this.token = (await this.context.env.KV.get(
      "CLOUDFLARE_STREAM_API_TOKEN"
    )) as string;
    return this.token;
  }

  async getLiveVideo() {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${this.accountID}/stream/live_inputs/${this.liveInputID}/videos`,
        {
          headers: { Authorization: `Bearer ${await this.getToken()}` },
        }
      );
      const {
        result: [video],
      } = (await response.json()) as CloudflareStreamVideosResponse;

      const isLive = video.status.state === "live-inprogress";
      if (isLive) return await mapCloudflareStreamVideo(video);
    } catch {}
  }

  async getVideos() {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${this.accountID}/stream/live_inputs/${this.liveInputID}/videos`,
        {
          headers: { Authorization: `Bearer ${await this.getToken()}` },
        }
      );
      const { result: videos } =
        (await response.json()) as CloudflareStreamVideosResponse;

      return await Promise.all(
        videos
          .filter((video) => video.readyToStream)
          .map(mapCloudflareStreamVideo)
      );
    } catch {}
  }

  async getVideo(id: string) {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${this.accountID}/stream/${id}`,
        {
          headers: { Authorization: `Bearer ${await this.getToken()}` },
        }
      );
      const { result: video } =
        (await response.json()) as CloudflareStreamVideoResponse;

      return await mapCloudflareStreamVideo(video);
    } catch {}
  }

  async getSchedule(): Promise<
    { title: string; start: string; end: string }[] | undefined
  > {
    try {
      let iCal: string | undefined = undefined;

      const cachedICal = await this.context.env.KV.get("twitch:ical");
      if (cachedICal) {
        iCal = cachedICal;
      } else {
        const response = await fetch(
          "https://api.twitch.tv/helix/schedule/icalendar?broadcaster_id=613488943"
        );
        iCal = await response.text();
        this.context.waitUntil(
          this.context.env.KV.put("twitch:ical", iCal, {
            expirationTtl: 60 * 60,
          })
        );
      }

      const matches = [
        ...iCal.matchAll(
          /BEGIN:VEVENT\nUID:(?<uid>.*)\n[\s\S]*?DTSTART;TZID=\/(?<startTimezone>.*?):(?<startYear>\d{4})(?<startMonth>\d{2})(?<startDay>\d{2})T(?<startHour>\d{2})(?<startMinute>\d{2})(?<startSecond>\d{2})\nDTEND;TZID=\/(?<endTimezone>.*?):(?<endYear>\d{4})(?<endMonth>\d{2})(?<endDay>\d{2})T(?<endHour>\d{2})(?<endMinute>\d{2})(?<endSecond>\d{2})\nSUMMARY:(?<summary>.*)\nRRULE:FREQ=WEEKLY;BYDAY=(?<day>.*)[\s\S]*?END:VEVENT/gm
        ),
      ]
        .map((match) => match.groups)
        .filter(Boolean) as {
        uid: string;
        startTimezone: string;
        startYear: string;
        startMonth: string;
        startDay: string;
        startHour: string;
        startMinute: string;
        startSecond: string;
        endTimezone: string;
        endYear: string;
        endMonth: string;
        endDay: string;
        endHour: string;
        endMinute: string;
        endSecond: string;
        summary: string;
        day: string;
      }[];

      const events = matches.map(
        ({
          startTimezone,
          startYear,
          startMonth,
          startDay,
          startHour,
          startMinute,
          startSecond,
          endTimezone,
          endYear,
          endMonth,
          endDay,
          endHour,
          endMinute,
          endSecond,
          summary,
          day,
        }) => {
          const start = moment.tz(
            {
              year: parseInt(startYear),
              month: parseInt(startMonth) - 1,
              day: parseInt(startDay),
              hour: parseInt(startHour),
              minute: parseInt(startMinute),
              second: parseInt(startSecond),
            },
            startTimezone
          );

          const end = moment.tz(
            {
              year: parseInt(endYear),
              month: parseInt(endMonth) - 1,
              day: parseInt(endDay),
              hour: parseInt(endHour),
              minute: parseInt(endMinute),
              second: parseInt(endSecond),
            },
            endTimezone
          );

          const duration = moment.duration(end.diff(start)).asMilliseconds();

          const rule = new Rule({
            frequency: "WEEKLY",
            byDayOfWeek: [day as DateAdapter.Weekday],
            start,
            duration,
          });

          const nextStart = rule
            .occurrences({
              start: moment().subtract(duration, "milliseconds"),
              take: 1,
            })
            .toArray()[0];

          return {
            title: summary,
            start: nextStart.toISOString(),
            end: (nextStart.end as Moment).toISOString(),
          };
        }
      );

      return events.sort((a, b) => a.start.localeCompare(b.start));
    } catch {}
  }
}
