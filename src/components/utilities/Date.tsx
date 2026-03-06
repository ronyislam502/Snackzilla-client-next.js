export const formatDate = (isoDate: string | Date | null | undefined) => {
  if (!isoDate) return "N/A";
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const TimeAgo = (isoDate: string | Date | null | undefined) => {
  if (!isoDate) return "---";
  const dateObj = new Date(isoDate);
  if (isNaN(dateObj.getTime())) return "---";

  const diffInMs = Date.now() - dateObj.getTime();
  if (diffInMs < 0) return "just now";
  
  const minutes = Math.floor(diffInMs / (1000 * 60));
  if (minutes < 1) return "just now";
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

export const orderTime = (isoDate: string | Date | null | undefined) => {
  if (!isoDate) return "--:--:--";
  const dateObj = new Date(isoDate);
  if (isNaN(dateObj.getTime())) return "--:--:--";

  return dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, 
  }); 
};
