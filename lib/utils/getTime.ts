import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

export const isCurrentDay = (day: dayjs.Dayjs) => {
  return day.isSame(dayjs(), "day");
};

export function getMonth(month = dayjs().month(), year = dayjs().year()) {
  // Get the first day of the month
  const firstDayOfMonth = dayjs().year(year).month(month).startOf("month");

  // Get the day of the week for the first day (0-6, where 0 is Sunday)
  const firstDayOfMonthWeekday = firstDayOfMonth.day();

  // Create a 2D array for the calendar (5 rows x 7 columns)
  const calendar: dayjs.Dayjs[][] = Array(5)
    .fill(0)
    .map((_, weekIndex) => {
      return Array(7)
        .fill(0)
        .map((_, dayIndex) => {
          // Calculate the day offset from the start of the calendar grid
          const dayOffset = weekIndex * 7 + dayIndex - firstDayOfMonthWeekday;
          // Add that many days to the first day of the month
          return firstDayOfMonth.add(dayOffset, "day");
        });
    });

  return calendar;
}

export const getWeekDays = (date: dayjs.Dayjs) => {
  const startOfWeek = date.startOf("week");

  const weekDates = [];

  // Loop through the 7 days of the week
  for (let i = 0; i < 7; i++) {
    const currentDate = startOfWeek.add(i, "day");
    weekDates.push({
      currentDate,
      today:
        currentDate.toDate().toDateString() === dayjs().toDate().toDateString(),
      isCurrentDay,
    });
  }

  return weekDates;
};

export const getHours = Array.from({ length: 24 }, (_, i) =>
  dayjs().startOf("day").add(i, "hour"),
);

// Function to generate weeks of the month dynamically

export const getWeeks = (monthIndex: number) => {
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, monthIndex, 1));
  const lastDayOfMonth = dayjs(new Date(year, monthIndex + 1, 0)); // Last day of the month

  const weeks: number[] = [];

  // Loop from the first day to the last day of the month
  let currentDay = firstDayOfMonth;
  while (
    currentDay.isBefore(lastDayOfMonth) ||
    currentDay.isSame(lastDayOfMonth)
  ) {
    const weekNumber = currentDay.week(); //This requires the WeekOfYear plugin to work as imported above
    if (!weeks.includes(weekNumber)) {
      weeks.push(weekNumber);
    }
    currentDay = currentDay.add(1, "day"); // Move to the next day
  }

  return weeks;
};
