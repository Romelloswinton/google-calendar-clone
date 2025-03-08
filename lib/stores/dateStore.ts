import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getMonth } from "../utils/getTime";

interface DateStoreType {
  userSelectedDate: Dayjs;
  twoDMonthArray: dayjs.Dayjs[][];
  selectedMonthIndex: number;
  setDate: (value: Dayjs) => void;
  setMonth: (index: number) => void;
  navigateToYearMonth: (year: number, month: number) => void;
}

export const useDateStore = create<DateStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        userSelectedDate: dayjs(),
        twoDMonthArray: getMonth(),
        selectedMonthIndex: dayjs().month(),

        setDate: (value: Dayjs) => {
          const newMonth = value.month();
          set({
            userSelectedDate: value,
            selectedMonthIndex: newMonth,
            twoDMonthArray: getMonth(newMonth, value.year()),
          });
        },

        setMonth: (index) => {
          // Keep the same year when changing months
          const currentDate = get().userSelectedDate;
          const newDate = currentDate.month(index);

          set({
            userSelectedDate: newDate,
            twoDMonthArray: getMonth(index, currentDate.year()),
            selectedMonthIndex: index,
          });
        },

        navigateToYearMonth: (year, month) => {
          const newDate = dayjs().year(year).month(month);
          set({
            userSelectedDate: newDate,
            twoDMonthArray: getMonth(month, year),
            selectedMonthIndex: month,
          });
        },
      }),
      { name: "date_data", skipHydration: true },
    ),
  ),
);
