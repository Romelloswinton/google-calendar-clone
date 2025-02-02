import dayjs from "dayjs";
import { CalendarEventType } from "@/lib/useEventStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  handleAnimationComplete,
  handleClose,
  zoom,
} from "@/lib/eventHandlers";
import { EventRenderer } from "./EventRenderer";
import { Button } from "@/components/ui/button";
export default function EventListPopover({
  onClose,
  isOpen,

  day,
  events,
}: {
  onClose: () => void;
  isOpen: boolean;
  day: dayjs.Dayjs;
  events: CalendarEventType[];
}) {
  const [isVisible, setIsVisible] = useState(true);

  const eventsForTheDay = events.filter((event) => {
    const eventDate = dayjs(event.date);
    return eventDate.isSame(day, "day");
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          {/* This div is for the background overlay and remains unaffected by zoom */}
          <motion.div
            className="w-full max-w-lg rounded-lg bg-white p-5"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit="exit"
            variants={zoom}
            onAnimationComplete={async () => {
              if (!isOpen) {
                await handleAnimationComplete();
                onClose();
              }
            }}
          >
            <h3 className="mb-3 text-xl font-bold">
              Events for {day.format("MMMM DD, YYYY")}
            </h3>
            <div>
              {eventsForTheDay.map((event, index) => (
                <div key={index} className="mb-4">
                  <EventRenderer events={[event]} />
                </div>
              ))}
            </div>
            <Button
              className="mt-4 bg-black px-4 py-2 text-white"
              onClick={(e) => handleClose(e, setIsVisible, onClose)}
            >
              Close
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
