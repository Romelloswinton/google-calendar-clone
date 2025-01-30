import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
