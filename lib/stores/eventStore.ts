import dayjs from "dayjs";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type CalendarEventType = {
  id: string;
  title: string;
  date: dayjs.Dayjs;
  description: string;
  color: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  guests: string;
};

// Utility to sort events
const sortEvents = (events: CalendarEventType[]): CalendarEventType[] => {
  return events.sort((a, b) => {
    if (a.isAllDay && !b.isAllDay) return -1;
    if (!a.isAllDay && b.isAllDay) return 1;
    return a.startTime.localeCompare(b.startTime);
  });
};

type EventStore = {
  events: CalendarEventType[];
  isPopoverOpen: boolean;
  isEventSummaryOpen: boolean;
  isEventListPopoverOpen: boolean;
  selectedEvent: CalendarEventType | null;
  eventListDay: dayjs.Dayjs | null;
  setEvents: (events: CalendarEventType[]) => void;
  openPopover: () => void;
  closePopover: () => void;
  openEventSummary: (event: CalendarEventType) => void;
  closeEventSummary: () => void;
  openEventListPopover: (day: dayjs.Dayjs) => void;
  closeEventListPopover: () => void;
  addEvent: (event: CalendarEventType) => void;
  removeEvent: (id: string) => void;
  updateEvent: (updatedEvent: CalendarEventType) => void;
};

export const useEventStore = create<EventStore>()(
  devtools(
    persist(
      (set) => ({
        events: [],
        isPopoverOpen: false,
        isEventSummaryOpen: false,
        isEventListPopoverOpen: false,
        selectedEvent: null,
        eventListDay: null,

        setEvents: (events) => set({ events: sortEvents(events) }),

        openPopover: () => set({ isPopoverOpen: true }),
        closePopover: () => set({ isPopoverOpen: false }),

        openEventSummary: (event) =>
          set({ isEventSummaryOpen: true, selectedEvent: event }),
        closeEventSummary: () =>
          set({ isEventSummaryOpen: false, selectedEvent: null }),

        openEventListPopover: (day) =>
          set({ isEventListPopoverOpen: true, eventListDay: day }),
        closeEventListPopover: () => set({ isEventListPopoverOpen: false }),

        addEvent: (newEvent) =>
          set((state) => ({ events: sortEvents([...state.events, newEvent]) })),

        removeEvent: (id) =>
          set((state) => ({
            events: state.events.filter((event) => event.id !== id),
          })),

        updateEvent: (updatedEvent) =>
          set((state) => ({
            events: sortEvents(
              state.events.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event,
              ),
            ),
          })),
      }),
      { name: "calendar_events", skipHydration: true },
    ),
  ),
);
