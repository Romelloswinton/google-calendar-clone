import React, { useMemo } from "react";
import dayjs from "dayjs";
import { useDateStore } from "@/lib/stores/dateStore";
import { useEventManagement } from "@/lib/hooks/useEventManagement";
import { CalendarEventType } from "@/lib/stores/eventStore";
import { CalendarCell } from "./CalendarCell";

export function CalendarGrid() {
  const { twoDMonthArray, userSelectedDate, selectedMonthIndex } =
    useDateStore();
  const { events } = useEventManagement();

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
          if (!day) return <div key={index} className="empty-day" />;

          const dayKey = day.format("YYYY-MM-DD");
          const dayEvents = eventsByDay[dayKey] || [];

          return (
            <CalendarCell
              key={dayKey}
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
