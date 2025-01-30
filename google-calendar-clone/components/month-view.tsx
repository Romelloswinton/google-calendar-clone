import React, { Fragment, useMemo } from "react";
import dayjs from "dayjs";
import { useDateStore } from "@/lib/useDateStore";
import { CalendarEventType, useEventStore } from "@/lib/useEventStore";
import MonthViewBox from "@/components/month-view-box";

export default function MonthView() {
  const { twoDMonthArray, userSelectedDate, selectedMonthIndex } =
    useDateStore();
  const { events } = useEventStore();

  console.table(twoDMonthArray);

  // Precompute event mapping before rendering
  const eventsByDay = useMemo(() => {
    return events.reduce(
      (acc, event) => {
        const key = event.date.format("YYYY-MM-DD");
        acc[key] = [...(acc[key] || []), event];
        return acc;
      },
      {} as Record<string, CalendarEventType[]>,
    );
  }, [events]);

  return (
    <section className="grid grid-cols-7 grid-rows-5 lg:h-[100vh]">
      {twoDMonthArray.map((row, i) =>
        row.map((day, index) => {
          if (!day) return <div key={index} className="empty-day"></div>; // Handle null days

          const dayKey = day.format("YYYY-MM-DD");
          const dayEvents = eventsByDay[dayKey] || [];

          return (
            <MonthViewBox
              key={dayKey} // Use dayKey for a stable and unique key
              day={day}
              rowIndex={i}
              events={dayEvents}
              isInCurrentMonth={day.month() === selectedMonthIndex}
              isPastDate={day.isBefore(dayjs(), "day")}
              isToday={day.isSame(dayjs(), "day")}
              isSelectedDate={day.isSame(userSelectedDate, "day")}
              className="items-center"
            />
          );
        }),
      )}
    </section>
  );
}
