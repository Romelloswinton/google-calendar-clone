import React, { useEffect, useState } from "react";
import { PopoverLayout } from "../layout/PopoverLayout";
import { useEventStore, type CalendarEventType } from "@/lib/stores/eventStore";
import dayjs, { Dayjs } from "dayjs";
import { usePopover } from "@/lib/hooks/usePopover";
import { Button } from "@/components/ui/button";
import { handleClose } from "@/lib/utils/eventHandlers";

interface EventListPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  day: Dayjs;
  events: CalendarEventType[];
}

export default function EventListPopover({
  isOpen,
  onClose,
  day,
  events,
}: EventListPopoverProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleCloseWithAnimation = () => {
    setTimeout(() => {
      onClose();
    }, 200);
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const eventsForDay = events.filter((event) =>
    dayjs(event.date).isSame(day, "day"),
  );

  return (
    <PopoverLayout
      isOpen={isOpen}
      isVisible={true}
      onClose={handleCloseWithAnimation}
      title="Events"
      day={day}
    >
      <div className="flex flex-col gap-2 p-4">
        {eventsForDay.map((event) => (
          <Button
            key={event.id}
            className="w-full text-left"
            variant="ghost"
            onClick={(e) => handleClose(e, setIsVisible, onClose)}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: event.color }}
              />
              <span>{event.title}</span>
            </div>
          </Button>
        ))}
        {eventsForDay.length === 0 && (
          <p className="text-center text-gray-500">No events for this day</p>
        )}
      </div>
    </PopoverLayout>
  );
}
