export const formatDate = (date: string) => {
  const isoDate = new Date(date).toISOString().slice(0, 10);
  return isoDate;
};
