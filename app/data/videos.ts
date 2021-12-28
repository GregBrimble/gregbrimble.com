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

export interface Video {
  name: string;
}

const mapCloudflareStreamVideo = async ({
  meta: { name },
}: CloudflareStreamVideo): Promise<Video> => ({
  name,
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
    //
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

  async getSchedule(): Promise<
    { title: string; start: string; end: string }[] | undefined
  > {
    try {
      const response = await fetch(
        "https://api.twitch.tv/helix/schedule/icalendar?broadcaster_id=613488943"
      );
      const ical = await response.text();

      const matches = [
        ...ical.matchAll(
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
            .occurrences({ start: moment(), take: 1 })
            .toArray()[0];

          return {
            title: summary,
            start: nextStart.toISOString(),
            end: (nextStart.end as Moment).toISOString(),
          };
        }
      );

      return events;
    } catch {}
  }
}
