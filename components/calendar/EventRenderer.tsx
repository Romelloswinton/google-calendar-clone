import { CalendarEventType, useEventStore } from "@/lib/stores/eventStore";
import React from "react";
import { cn } from "@/lib/utils/utils";

export function EventRenderer({
  events,
  cellHeight, // New prop to allow for responsive sizing based on cell height
  maxEvents = 3, // Default max visible events before showing +more
  dayLabel, // Add prop for the day label (e.g., "Monday, March 4")
}: {
  events: CalendarEventType[];
  cellHeight?: number;
  maxEvents?: number;
  dayLabel?: string;
}) {
  const { openEventSummary } = useEventStore();

  // If we have more events than we can show, we'll display a "+X more" indicator
  const displayEvents = events.slice(0, maxEvents);
  const remainingCount = events.length - maxEvents;

  // Helper function to convert 24-hour time to 12-hour AM/PM format
  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Calculate available height per event (adjusted for cell size)
  const eventHeight = Math.min(
    25, // Max height in pixels
    cellHeight
      ? Math.floor(
          (cellHeight * 0.7) /
            (displayEvents.length + (remainingCount > 0 ? 1 : 0)),
        )
      : 25,
  );

  // Helper to determine if the color value is an HSL color
  const isHslColor = (color: string): boolean => {
    return color.startsWith("hsl(");
  };

  // Helper to determine if text should be white or dark based on background color
  const getTextColorForHsl = (hslColor: string): string => {
    // Extract lightness value from HSL
    const match = hslColor.match(/hsl\([^,]+,[^,]+,\s*(\d+)%\)/);
    if (match && match[1]) {
      const lightness = parseInt(match[1], 10);
      // If lightness is less than 60%, use white text, otherwise use dark text
      return lightness < 60 ? "text-white" : "text-gray-900";
    }
    return "text-gray-900"; // Default to dark text
  };

  // Create accessible description for event
  const getEventDescription = (event: CalendarEventType): string => {
    const timeInfo = event.isAllDay
      ? "All day event"
      : `From ${formatTime(event.startTime)}${event.endTime ? ` to ${formatTime(event.endTime)}` : ""}`;

    const dayInfo = dayLabel ? ` on ${dayLabel}` : "";

    return `${event.title}. ${timeInfo}${dayInfo}`;
  };

  return (
    <div
      className="flex w-full flex-col space-y-1 overflow-hidden px-1"
      aria-label={`Events${dayLabel ? ` for ${dayLabel}` : ""}`}
      role="list"
    >
      {displayEvents.map((event) => {
        // Determine text color based on background - either from HSL or Tailwind class
        let textColor = "text-white"; // Default
        let backgroundStyle = {};
        let dotStyle = {};

        if (isHslColor(event.color)) {
          textColor = "text-white";
          backgroundStyle = event.isAllDay
            ? { backgroundColor: event.color }
            : {};
          dotStyle = { backgroundColor: event.color };
        } else {
          // For backward compatibility with Tailwind classes
          textColor = "text-white"; // Assume Tailwind colors need white text
        }

        return (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              openEventSummary(event);
            }}
            className={cn(
              "flex w-full cursor-pointer items-center overflow-hidden rounded-md px-1.5",
              // Only apply Tailwind class if not using HSL color
              !isHslColor(event.color) && event.isAllDay
                ? `${event.color} text-white`
                : "",
            )}
            style={{
              height: `${eventHeight}px`,
              minHeight: "18px", // Minimum height for very small cells
              ...backgroundStyle,
            }}
            role="listitem"
            aria-label={getEventDescription(event)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openEventSummary(event);
              }
            }}
          >
            {/* Timed events: Show color dot + start time */}
            {!event.isAllDay && (
              <>
                <div
                  className={cn(
                    "mr-1 h-2 w-2 flex-shrink-0 rounded-full",
                    !isHslColor(event.color) ? event.color : "",
                  )}
                  style={dotStyle}
                  aria-hidden="true"
                ></div>
                <span
                  className="mr-1 flex-shrink-0 text-gray-500"
                  style={{
                    fontSize: `${Math.max(10, Math.min(14, eventHeight - 8))}px`,
                  }}
                >
                  {formatTime(event.startTime)}
                </span>
              </>
            )}

            {/* Event title with dynamic scaling */}
            <span
              className={cn(
                "min-w-0 flex-1 overflow-hidden truncate whitespace-nowrap",
                event.isAllDay && isHslColor(event.color) ? textColor : "",
              )}
              style={{
                fontSize: `${Math.max(10, Math.min(14, eventHeight - 8))}px`,
              }}
            >
              {event.title}
            </span>
          </div>
        );
      })}

      {/* "More" indicator if we have more events than we can display */}
      {remainingCount > 0 && (
        <div
          className="cursor-pointer px-1.5 text-gray-500"
          style={{
            fontSize: `${Math.max(10, Math.min(14, eventHeight - 8))}px`,
            height: `${eventHeight}px`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            // You could show a modal with all events for this day
            // or navigate to a day view
          }}
          role="button"
          aria-label={`${remainingCount} more events${dayLabel ? ` for ${dayLabel}` : ""}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              // Add your function to show all events here
            }
          }}
        >
          +{remainingCount} more
        </div>
      )}
    </div>
  );
}
