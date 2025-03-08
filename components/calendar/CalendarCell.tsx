import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { calculateVisibleEventCount, cn } from "@/lib/utils/utils";
import { CalendarEventType, useEventStore } from "@/lib/stores/eventStore";
import { useDateStore } from "@/lib/stores/dateStore";
import { EventRenderer } from "@/components/calendar/EventRenderer";
import { CellHeader } from "./CellHeader";

interface CalendarCellProps {
  day: dayjs.Dayjs | null;
  rowIndex: number;
  events: CalendarEventType[];
  isInCurrentMonth: boolean;
  isPastDate: boolean;
  isToday: boolean;
  isSelectedDate: boolean;
  className: string;
}

export function CalendarCell(props: CalendarCellProps) {
  const { openPopover, openEventListPopover } = useEventStore();
  const { setDate } = useDateStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleEventCount, setVisibleEventCount] = useState(0);
  const [cellHeight, setCellHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  // Sort events: all-day events first, then by start time
  const sortedEvents = [...props.events].sort((a, b) => {
    if (a.isAllDay && !b.isAllDay) return -1;
    if (!a.isAllDay && b.isAllDay) return 1;

    if (!a.isAllDay && !b.isAllDay) {
      // Compare start times for timed events
      return (a.startTime || "").localeCompare(b.startTime || "");
    }

    return 0;
  });

  // Track window width changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateVisibleEvents = useCallback(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      setCellHeight(containerHeight);

      // Special handling for width around 978px
      if (windowWidth >= 975 && windowWidth <= 985) {
        // Apply specific adjustments for this breakpoint
        const adjustedHeight = containerHeight * 0.9; // Reduce by 10% to account for layout shifts
        setVisibleEventCount(calculateVisibleEventCount(adjustedHeight));
      } else {
        setVisibleEventCount(calculateVisibleEventCount(containerHeight));
      }
    }
  }, [windowWidth]);

  useEffect(() => {
    calculateVisibleEvents();

    // Using ResizeObserver for container height changes
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      const resizeObserver = new ResizeObserver(calculateVisibleEvents);
      resizeObserver.observe(containerRef.current);
      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current);
        }
      };
    } else {
      // Fallback to window resize for older browsers
      window.addEventListener("resize", calculateVisibleEvents);
      return () => window.removeEventListener("resize", calculateVisibleEvents);
    }
  }, [calculateVisibleEvents, windowWidth]);

  // Force recalculation whenever width changes near our problem breakpoint
  useEffect(() => {
    calculateVisibleEvents();
  }, [windowWidth, calculateVisibleEvents]);

  const handleCellClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (props.day) {
      setDate(props.day);

      // Only open the event list popover if there are hidden events
      if (props.events.length > visibleEventCount) {
        openEventListPopover(props.day);
      }
    }
  };

  const handleAddEventClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (props.day) {
      setDate(props.day);
      openPopover();
    }
  };

  // Apply special CSS when near the problematic breakpoint
  const isNearBreakpoint = windowWidth >= 975 && windowWidth <= 985;

  // Create accessible labels and descriptions
  const formattedDate = props.day ? props.day.format("MMMM D, YYYY") : "";
  const dateStatus = props.isToday ? "Today, " : "";
  const monthStatus = !props.isInCurrentMonth ? "Outside current month, " : "";
  const eventCountText =
    props.events.length === 1 ? "1 event" : `${props.events.length} events`;
  const cellLabel = `${dateStatus}${formattedDate}${props.events.length > 0 ? `, ${eventCountText}` : ", No events"}`;

  // Create unique IDs for accessibility
  const cellId = props.day ? `cell-${props.day.format("YYYY-MM-DD")}` : "";
  const eventsRegionId = `${cellId}-events`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex flex-1 cursor-pointer flex-col items-start border transition-all hover:bg-violet-50",
        "w-full md:w-auto",
        // Set a consistent minimum height at all breakpoints
        "min-h-[120px]",
        // Maintain height-related classes for larger screens
        "lg:min-h-[140px]",
        // Adjust padding to maintain consistent space for the "+more" button
        isNearBreakpoint ? "pb-[22px]" : "pb-[20px]",
        !props.isInCurrentMonth && "bg-gray-100",
        props.isPastDate && !props.isToday && "opacity-50",
        props.isSelectedDate,
        props.className,
      )}
      // Add inline style for the problematic breakpoint
      style={
        isNearBreakpoint
          ? {
              flexBasis: "calc(100% / 7)",
              flexGrow: 0,
              flexShrink: 0,
              minHeight: "120px", // Ensure minimum height with inline style too
            }
          : {
              minHeight: "120px", // Consistent minimum height across all breakpoints
            }
      }
      onClick={handleCellClick}
      role="gridcell"
      tabIndex={0}
      aria-label={cellLabel}
      id={cellId}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCellClick(e as unknown as React.MouseEvent);
        }
      }}
      aria-selected={props.isSelectedDate}
      aria-current={props.isToday ? "date" : undefined}
    >
      <button
        type="button"
        className="absolute right-2 top-2 cursor-pointer p-1 text-xs text-black opacity-0 hover:text-gray-700 group-hover:opacity-100"
        onClick={handleAddEventClick}
        aria-label={`Add event on ${formattedDate}`}
      >
        +
      </button>

      <CellHeader {...props} />

      {/* Container for events with proper spacing */}
      <div
        className={cn(
          "w-full flex-1 overflow-hidden px-1",
          // Additional class for problematic breakpoint
          isNearBreakpoint ? "max-h-[calc(100%-40px)]" : "",
        )}
        id={eventsRegionId}
        role="region"
        aria-label={`Events for ${formattedDate}`}
      >
        <div className="mt-1 flex flex-col space-y-1">
          {sortedEvents.slice(0, visibleEventCount).map((event) => (
            <EventRenderer key={event.id} events={[event]} />
          ))}
        </div>
      </div>

      {props.events.length > visibleEventCount && (
        <button
          className={cn(
            "absolute bottom-1 left-0 right-0 w-full truncate whitespace-nowrap bg-white/75 p-1 text-xs font-medium text-black shadow-sm hover:bg-white",
            // Ensure the "+more" button has consistent positioning
            isNearBreakpoint ? "bottom-0" : "bottom-1",
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (props.day) {
              setDate(props.day);
              openEventListPopover(props.day);
            }
          }}
          aria-label={`View all ${props.events.length} events for ${formattedDate}`}
          aria-controls={eventsRegionId}
          aria-expanded="false"
        >
          +{props.events.length - visibleEventCount} more
        </button>
      )}
    </div>
  );
}
