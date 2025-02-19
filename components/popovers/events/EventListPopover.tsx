import React, { useEffect, useState } from "react";
import { PopoverLayout } from "../layout/PopoverLayout";
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
  const [isVisible, setIsVisible] = useState(true);
  const { openEventSummary } = useEventStore();

  const handleCloseWithAnimation = () => {
    setTimeout(() => {
      onClose();
    }, 200);
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const eventsForDay = events.filter((event) =>
    dayjs(event.date).isSame(day, "day"),
  );

  return (
    <PopoverLayout
      isOpen={isOpen}
      isVisible={true}
      onClose={handleCloseWithAnimation}
      title="Events"
      day={day}
    >
      <div className="flex flex-col gap-2 p-4">
        {eventsForDay.map((event) => {
          const textColor = "text-white";

          return (
            <div
              key={event.id}
              onClick={(e) => {
                e.stopPropagation();
                handleCloseWithAnimation();
                openEventSummary(event);
              }}
              className={cn(
                "line-clamp-1 flex w-full cursor-pointer items-center space-x-2 rounded-sm p-2.5 text-sm",
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
                  <div
                    className={cn("h-3 w-3 rounded-full", event.color)}
                  ></div>
                  <span className="text-sm text-gray-500">
                    {event.startTime}
                  </span>
                </>
              )}

              {/* Always render event title */}
              <span>{event.title}</span>
            </div>
          );
        })}
        {eventsForDay.length === 0 && (
          <p className="text-center text-gray-500">No events for this day</p>
        )}
      </div>
    </PopoverLayout>
  );
}
