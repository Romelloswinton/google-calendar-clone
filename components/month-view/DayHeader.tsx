import React from "react";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

interface DayHeaderProps {
  day: dayjs.Dayjs;
  rowIndex: number;
  isSelectedDate: boolean;
  isToday: boolean;
}

export function DayHeader({
  day,
  rowIndex,
  isSelectedDate,
  isToday,
}: DayHeaderProps) {
  return (
    <div className="flex flex-col items-center pt-2">
      {rowIndex === 0 && (
        <h4 className="text-xs text-gray-500">
          {day.format("ddd").toUpperCase()}
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
      >
        {day.date()}
      </h4>
    </div>
  );
}
