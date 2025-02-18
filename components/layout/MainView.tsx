"use client";
import { useEffect } from "react";
import { CalendarGrid } from "../calendar/grid/CalendarGrid";
import { useEventStore, CalendarEventType } from "@/lib/stores/eventStore";
import { useDateStore } from "@/lib/stores/dateStore";
import { useEventManagement } from "@/lib/hooks/useEventManagement";
import CreateEventPopover from "@/components/popovers/events/CreateEventPopover";
import EventListPopover from "@/components/popovers/events/EventListPopover";
import EventSummaryPopover from "@/components/popovers/events/EventSummaryPopover";
import dayjs from "dayjs";

export function MainView() {
  const {
    closePopover,
    isPopoverOpen,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
    isEventListPopoverOpen,
    closeEventListPopover,
    eventListDay,
    events,
    setEvents,
  } = useEventStore();

  const { userSelectedDate } = useDateStore();

  // Load events from localStorage when the component mounts
  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      const updatedEvents = parsedEvents.map(
        (event: Omit<CalendarEventType, "date"> & { date: string }) => ({
          ...event,
          date: dayjs(event.date),
        }),
      );
      setEvents(updatedEvents);
    }
  }, [setEvents]);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  console.log(" render - isPopoverOpen:", isPopoverOpen);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1500px]">
        <div className="flex">
          <div className="w-full flex-1">
            <CalendarGrid />
          </div>

          {isPopoverOpen && (
            <CreateEventPopover
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
      </div>
    </div>
  );
}
