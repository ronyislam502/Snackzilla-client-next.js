export const formatDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const TimeAgo = (isoDate: string) => {
  const diffInMs = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diffInMs / (1000 * 60));

  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
};

export const orderTime = (isoDate: string) => {
  const dateObj = new Date(isoDate);
  return dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // 12-hour format with AM/PM
  }); // "HH:MM:SS"
};
