import { useCallback, useEffect } from "react";
import dayjs from "dayjs";
import { CalendarEventType, useEventStore } from "@/lib/useEventStore";

export const useEventManagement = () => {
  const { events, setEvents } = useEventStore();

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      const parsedEvents: CalendarEventType[] = JSON.parse(savedEvents);
      const updatedEvents = parsedEvents.map((event) => ({
        ...event,
        date: dayjs(event.date),
      }));
      setEvents(updatedEvents);
    }
  }, [setEvents]);

  // Save events to localStorage
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  // Get events for a specific day
  const getEventsForDay = useCallback(
    (day: dayjs.Dayjs) => {
      return events.filter((event) => dayjs(event.date).isSame(day, "day"));
    },
    [events],
  );

  return {
    events,
    getEventsForDay,
  };
};
