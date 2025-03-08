import React, { useEffect } from "react";
import { PopoverLayout } from "./PopoverLayout";
import { useEventStore, type CalendarEventType } from "@/lib/stores/eventStore";
import dayjs, { Dayjs } from "dayjs";
import { cn } from "@/lib/utils/utils";

interface EventListPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  day: Dayjs;
  events: CalendarEventType[];
}

export default function EventListPopover({
  isOpen,
  onClose,
  day,
  events,
}: EventListPopoverProps) {
  const { openEventSummary } = useEventStore();

  const handleCloseWithAnimation = () => {
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const eventsForDay = events.filter((event) =>
    dayjs(event.date).isSame(day, "day"),
  );

  const formattedDate = day.format("MMMM D, YYYY");

  return (
    <PopoverLayout
      isOpen={isOpen}
      onClose={handleCloseWithAnimation}
      title="Events"
      day={day}
      aria-modal="true"
      aria-label={`Events for ${formattedDate}`}
    >
      <div
        className="flex flex-col gap-2 p-4"
        aria-live="polite"
        aria-atomic="true"
      >
        {eventsForDay.length > 0 ? (
          <ul aria-label={`List of events for ${formattedDate}`} role="list">
            {eventsForDay.map((event) => {
              const startTimeText = event.isAllDay
                ? "All day"
                : event.startTime;
              const eventAccessibleLabel = `${event.title}, ${startTimeText}, ${event.isAllDay ? "all day event" : "timed event"}`;

              return (
                <li
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseWithAnimation();
                    openEventSummary(event);
                  }}
                  className={cn(
                    "line-clamp-1 flex w-full cursor-pointer items-center space-x-2 rounded-sm p-2.5 text-sm",
                    event.isAllDay ? "text-white" : "text-gray-900",
                  )}
                  style={{
                    backgroundColor: event.isAllDay
                      ? event.color
                      : "transparent",
                    marginBottom: "8px", // Add spacing between events
                    flexShrink: 0,
                    minHeight: "7%",
                    maxHeight: "11%",
                  }}
                  role="button"
                  aria-label={eventAccessibleLabel}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCloseWithAnimation();
                      openEventSummary(event);
                    }
                  }}
                >
                  {/* Timed events: Show color dot + start time */}
                  {!event.isAllDay && (
                    <>
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: event.color }}
                        aria-hidden="true"
                      ></div>
                      <span className="text-sm text-gray-500">
                        {event.startTime}
                      </span>
                    </>
                  )}

                  {/* Always render event title */}
                  <span>{event.title}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500" aria-live="assertive">
            No events for this day
          </p>
        )}
      </div>
    </PopoverLayout>
  );
}
