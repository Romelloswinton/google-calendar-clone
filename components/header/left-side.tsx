"use client";
import React from "react";
import { Button } from "../ui/button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import dayjs from "dayjs";
import { useViewStore } from "@/lib/useViewStore";
import { useDateStore } from "@/lib/useDateStore";

export default function HeaderLeft() {
  const todaysDate = dayjs();
  const { setMonth, setDate, selectedMonthIndex } = useDateStore();

  const handleTodayClick = () => {
    setDate(todaysDate); // Always set today's date
    setMonth(todaysDate.month()); // Ensure the month matches today's date
  };

  const handlePrevClick = () => {
    setMonth(selectedMonthIndex - 1); // Move to the previous month
  };

  const handleNextClick = () => {
    setMonth(selectedMonthIndex + 1); // Move to the next month
  };

  return (
    <div className="flex items-center gap-3">
      {/* Today Button */}
      <Button onClick={handleTodayClick} variant="outline">
        Today
      </Button>

      {/* Navigation Controls */}
      <div className="flex items-center gap-3">
        <MdKeyboardArrowLeft
          onClick={handlePrevClick}
          className="size-6 cursor-pointer font-bold"
        />
        <MdKeyboardArrowRight
          onClick={handleNextClick}
          className="size-6 cursor-pointer font-bold"
        />
      </div>

      {/* Current Month and Year Display */}
      <h1 className="hidden text-xl lg:block">
        {dayjs(new Date(dayjs().year(), selectedMonthIndex)).format(
          "MMMM YYYY",
        )}
      </h1>
    </div>
  );
}
