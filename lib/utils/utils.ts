import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateVisibleEventCount = (
  containerHeight: number,
  eventHeight: number = 30,
  hiddenCountHeight: number = 20,
) => {
  const maxVisibleEvents = Math.min(
    4,
    Math.floor((containerHeight - hiddenCountHeight) / eventHeight),
  );
  return maxVisibleEvents;
};

export const formatTime = (time: string) => {
  if (!time) return "";
  // Convert 24h time string to 12h format with AM/PM
  return dayjs(`2000-01-01 ${time}`).format("h:mm A");
};
