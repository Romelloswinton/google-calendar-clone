import { CalendarEventType, useEventStore } from "@/lib/stores/eventStore";
import React from "react";

export function EventRenderer({ events }: { events: CalendarEventType[] }) {
  const { openEventSummary } = useEventStore();

  return (
    <>
      {events.map((event) => {
        const eventClasses = event.isAllDay ? "text-white" : "text-gray-900"; // Conditional text color

        return (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              openEventSummary(event);
            }}
            className={`line-clamp-1 flex w-[90%] cursor-pointer items-center space-x-2 rounded-sm p-2.5 text-sm ${eventClasses}`}
            style={{
              backgroundColor: event.isAllDay ? event.color : "transparent",
              flexShrink: 0,
              minHeight: "7%",
              maxHeight: "11%",
            }}
          >
            {/* Render the color dot and start time only for non-all-day events */}
            {!event.isAllDay && (
              <>
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: event.color }}
                ></div>
                <span className="text-sm text-gray-500">{event.startTime}</span>
              </>
            )}

            {/* Always render event title */}
            <span>{event.title}</span>
          </div>
        );
      })}
    </>
  );
}
