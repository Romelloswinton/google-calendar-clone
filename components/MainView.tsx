"use client";
import { useEffect } from "react";
import dayjs from "dayjs";

import EventPopover from "./EventPopover/EventPopover";
import EventListPopover from "./EventPopover/event-list-popover";
import EventSummaryPopover from "./EventPopover/event-summary-popover";
import { CalendarEventType, useEventStore } from "@/lib/useEventStore";
import { useDateStore } from "@/lib/useDateStore";
import MonthView from "@/components/month-view";

export default function MainView() {
  const {
    closePopover,
    isPopoverOpen,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
    events,
    setEvents,
    isEventListPopoverOpen,
    closeEventListPopover,
    eventListDay,
  } = useEventStore();

  const { userSelectedDate } = useDateStore();

  // Load events from localStorage when the component mounts
  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      const parsedEvents: CalendarEventType[] = JSON.parse(savedEvents);
      const updatedEvents = parsedEvents.map((event) => ({
        ...event,
        date: dayjs(event.date), // Ensure proper conversion to Dayjs
      }));
      setEvents(updatedEvents);
    }
  }, [setEvents]);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  return (
    <div className="flex">
      <div className="w-full flex-1">
        <MonthView />
      </div>

      {/* Popovers */}
      {isPopoverOpen && (
        <EventPopover
          isOpen={isPopoverOpen}
          onClose={closePopover}
          date={userSelectedDate.format("YYYY-MM-DD")}
        />
      )}

      {isEventSummaryOpen && selectedEvent && (
        <EventSummaryPopover
          isOpen={isEventSummaryOpen}
          onClose={closeEventSummary}
          event={selectedEvent}
        />
      )}

      {isEventListPopoverOpen && eventListDay && (
        <EventListPopover
          events={events}
          day={eventListDay}
          isOpen={isEventListPopoverOpen}
          onClose={closeEventListPopover}
        />
      )}
    </div>
  );
}
