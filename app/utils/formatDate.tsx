export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    dateStyle: "long",
  });
};
