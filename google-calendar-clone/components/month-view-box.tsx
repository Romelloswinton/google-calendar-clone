import { calculateVisibleEventCount, cn } from "@/lib/utils";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CalendarEventType, useEventStore } from "@/lib/useEventStore";
import { useDateStore } from "@/lib/useDateStore";
import { EventRenderer } from "./EventPopover/event-renderer";

export default function MonthViewBox({
  day,
  rowIndex,
  events,
  isInCurrentMonth,
  isPastDate,
  isToday,
  isSelectedDate,
  className,
}: {
  day: dayjs.Dayjs | null;
  rowIndex: number;
  events: CalendarEventType[];
  isInCurrentMonth: boolean;
  isPastDate: boolean;
  isToday: boolean;
  isSelectedDate: boolean;
  className: string;
}) {
  const { openPopover, openEventListPopover } = useEventStore();
  const { setDate } = useDateStore();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleEventCount, setVisibleEventCount] = useState(0);

  // Calculate visible events on mount and window resize
  const calculateVisibleEvents = useCallback(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      setVisibleEventCount(calculateVisibleEventCount(containerHeight));
    }
  }, []);

  useEffect(() => {
    calculateVisibleEvents(); // Initial calculation
    window.addEventListener("resize", calculateVisibleEvents); // Recalculate on resize

    return () => window.removeEventListener("resize", calculateVisibleEvents);
  }, [calculateVisibleEvents]);

  if (!day) {
    return (
      <div className="h-12 w-full border md:h-28 md:w-full lg:h-full"></div>
    ); // Placeholder if no day
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDate(day); // Set the clicked date as the selected date

    if (events.length > visibleEventCount) {
      openEventListPopover(day); // Show event list popover if events are hidden
    } else {
      openPopover(); // Open event creation popup
    }
  };

  // Determine visible events and hidden event count
  const visibleEvents = events.slice(0, visibleEventCount);
  const hiddenEventCount = events.length - visibleEvents.length;

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex flex-1 cursor-pointer flex-col items-start gap-y-2 border pb-[20px] transition-all hover:bg-violet-50",
        "w-full md:w-auto",
        "lg:h-full", // Adjust height for larger screens
        !isInCurrentMonth && "bg-gray-100", // Gray out days outside the selected month/year
        isPastDate && !isToday && "opacity-50", // For past dates
        className,
      )}
      onClick={handleClick}
    >
      {/* Add event button on hover */}
      <div
        className="absolute right-2 top-2 cursor-pointer p-1 text-xs text-black opacity-0 hover:text-gray-700 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation(); // Prevent propagation to day click handler
          openPopover(); // Open event popup
        }}
      >
        <span>+</span>
      </div>

      <div className="flex flex-col items-center pt-2">
        {rowIndex === 0 && (
          <h4 className="text-xs text-gray-500">
            {day.format("ddd").toUpperCase()}
          </h4> // Display weekday name for first row
        )}
        <h4
          className={cn(
            "text-center text-sm",
            isSelectedDate
              ? "flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white"
              : isToday &&
                  "flex h-8 w-8 items-center justify-center rounded-full border border-blue-600 text-blue-600",
          )}
        >
          {day.date()}
        </h4>
      </div>

      {/* Render visible events */}
      {visibleEvents.map((event, index) => (
        <EventRenderer key={index} events={[event]} />
      ))}

      {/* Show overlay if there are hidden events */}
      {hiddenEventCount > 0 && (
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-2 text-sm font-medium text-black"
          onClick={(e) => {
            e.stopPropagation();
            handleClick(e); // Prevent overlay from triggering day selection
          }}
        >
          +{hiddenEventCount} more
        </div>
      )}
    </div>
  );
}
