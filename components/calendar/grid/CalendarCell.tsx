import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { calculateVisibleEventCount, cn } from "@/lib/utils/utils";
import { CalendarEventType, useEventStore } from "@/lib/stores/eventStore";
import { useDateStore } from "@/lib/stores/dateStore";
import { CellHeader } from "./CellHeader";
import { EventRenderer } from "@/components/calendar/events/EventRenderer";

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

  const calculateVisibleEvents = useCallback(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      setVisibleEventCount(calculateVisibleEventCount(containerHeight));
    }
  }, []);

  useEffect(() => {
    calculateVisibleEvents();
    window.addEventListener("resize", calculateVisibleEvents);
    return () => window.removeEventListener("resize", calculateVisibleEvents);
  }, [calculateVisibleEvents]);

  const handleCellClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDate(props.day!);
    if (props.events.length > visibleEventCount) {
      openEventListPopover(props.day!);
    }
  };

  const handleAddEventClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Add event clicked");
    setDate(props.day!);
    openPopover();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex flex-1 cursor-pointer flex-col items-start gap-y-2 border pb-[20px] transition-all hover:bg-violet-50",
        "w-full md:w-auto",
        "lg:h-full",
        !props.isInCurrentMonth && "bg-gray-100",
        props.isPastDate && !props.isToday && "opacity-50",
        props.className,
      )}
      onClick={handleCellClick}
    >
      <button
        type="button"
        className="absolute right-2 top-2 cursor-pointer p-1 text-xs text-black opacity-0 hover:text-gray-700 group-hover:opacity-100"
        onClick={handleAddEventClick}
      >
        +
      </button>

      <CellHeader {...props} />

      {props.events.slice(0, visibleEventCount).map((event) => (
        <EventRenderer key={event.id} events={[event]} />
      ))}

      {props.events.length > visibleEventCount && (
        <button
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-2 text-sm font-medium text-black"
          onClick={(e) => {
            e.stopPropagation();
            handleCellClick(e);
          }}
        >
          +{props.events.length - visibleEventCount} more
        </button>
      )}
    </div>
  );
}
