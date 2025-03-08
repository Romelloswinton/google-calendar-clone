import React from "react";
import dayjs from "dayjs";
import { cn } from "@/lib/utils/utils";

interface CellHeaderProps {
  day: dayjs.Dayjs | null;
  rowIndex: number;
  isSelectedDate: boolean;
  isToday: boolean;
}

export function CellHeader({
  day,
  rowIndex,
  isSelectedDate,
  isToday,
}: CellHeaderProps) {
  if (!day) return null;

  const dayOfMonth = day.date();
  const dayName = day.format("ddd").toUpperCase();
  const fullDate = day.format("MMMM D, YYYY");

  return (
    <div className="flex flex-col items-center pt-2" role="presentation">
      {rowIndex === 0 && (
        <h4 className="text-xs text-gray-500" aria-hidden="true">
          {dayName}
        </h4>
      )}
      <h4
        className={cn(
          "text-center text-sm",
          isSelectedDate
            ? "flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white"
            : isToday &&
                "flex h-8 w-8 items-center justify-center rounded-full border border-blue-600 text-blue-600",
        )}
        aria-label={fullDate}
        aria-current={isToday ? "date" : undefined}
        aria-selected={isSelectedDate}
      >
        {dayOfMonth}
      </h4>
    </div>
  );
}
