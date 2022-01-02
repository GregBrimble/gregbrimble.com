import moment from "moment";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    dateStyle: "long",
  });
};

export const formatDuration = (durationString: string) => {
  const duration = moment.duration(durationString);

  return `${duration.hours()} hours ${duration.minutes()} minutes`;
};
