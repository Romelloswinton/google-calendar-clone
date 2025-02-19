import { CalendarEventType, useEventStore } from "@/lib/stores/eventStore";
import React from "react";
import { cn } from "@/lib/utils/utils";

export function EventRenderer({ events }: { events: CalendarEventType[] }) {
  const { openEventSummary } = useEventStore();

  return (
    <>
      {events.map((event) => {
        const textColor = "text-white";

        return (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              openEventSummary(event);
            }}
            className={cn(
              "line-clamp-1 flex w-[90%] cursor-pointer items-center space-x-2 rounded-sm p-2.5 text-sm",
              event.isAllDay ? event.color : "bg-transparent", // Background color only for all-day events
              event.isAllDay ? textColor : "text-gray-900",
            )}
            style={{
              flexShrink: 0,
              minHeight: "7%",
              maxHeight: "11%",
            }}
          >
            {/* Timed events: Show color dot + start time */}
            {!event.isAllDay && (
              <>
                <div className={cn("h-3 w-3 rounded-full", event.color)}></div>
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
