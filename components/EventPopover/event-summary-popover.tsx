import {
  HiOutlineMenuAlt2,
  HiOutlineMenuAlt4,
  HiOutlineUsers,
} from "react-icons/hi";
import { Button } from "../ui/button";
import { IoCloseSharp } from "react-icons/io5";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { CalendarEventType, useEventStore } from "@/lib/useEventStore";
import { AnimatePresence, motion } from "framer-motion";
import {
  handleAnimationComplete,
  handleClose,
  handlePopoverClick,
  zoom,
} from "@/lib/eventHandlers";
import InputField from "./Form Components/InputField";
import { ColorPicker } from "./Form Components/ColorPicker";
import TimeInput from "./Form Components/TimeInput";
import Checkbox from "./Form Components/Checkbox";

interface EventSummaryPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEventType;
}

export default function EventSummaryPopover({
  isOpen,
  onClose,
  event,
}: EventSummaryPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { updateEvent, removeEvent } = useEventStore();
  const [title, setTitle] = useState(event.title);
  const [guests, setGuests] = useState(event.guests);
  const [description, setDescription] = useState(event.description);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [isAllDay, setIsAllDay] = useState(event.isAllDay);
  const [color, setColor] = useState(event.color);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleSave = async () => {
    const updatedEvent = {
      ...event,
      title,
      guests,
      description,
      startTime,
      endTime,
      isAllDay,
      color,
    };

    setIsVisible(false);

    await handleAnimationComplete(500);
    updateEvent(updatedEvent);
    onClose();
  };

  const handleDelete = async () => {
    setIsVisible(false);

    await handleAnimationComplete(500);

    onClose();
    removeEvent(event.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => handleClose(e, setIsVisible, onClose)}
        >
          <motion.div
            ref={popoverRef}
            className="w-full max-w-md rounded-lg bg-white shadow-lg"
            onClick={(e) => handlePopoverClick(e)}
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
            <div className="mb-2 flex items-center justify-between rounded-md bg-slate-100 p-1">
              <HiOutlineMenuAlt4 />
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleClose(e, setIsVisible, onClose)}
              >
                <IoCloseSharp className="h-4 w-4" />
              </Button>
            </div>
            {/* Header Section */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold">Event Details</h2>
              <p className="text-sm text-gray-600">
                {dayjs(event.date).format("dddd, MMMM D, YYYY")}
              </p>
            </div>
            <div className="space-y-4 p-6">
              {/* Title Input */}
              <div>
                <InputField
                  type="text"
                  name="title"
                  placeholder=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="my-4 rounded-none border-0 border-b text-2xl focus-visible:border-b-2 focus-visible:border-b-blue-600 focus-visible:ring-0"
                />
              </div>
              {/* All Day Checkbox */}
              <Checkbox
                id="allDay"
                label="All Day?"
                checked={isAllDay}
                onChange={(newChecked) => setIsAllDay(newChecked)}
              />

              {/* Time Inputs */}
              {!isAllDay && (
                <div className="flex space-x-6">
                  <TimeInput
                    label="Start Time"
                    value={startTime}
                    onChange={(newStartTime: string) => {
                      if (newStartTime <= endTime || endTime === "") {
                        setEndTime(newStartTime);
                      }
                    }}
                  />
                  <TimeInput
                    label="End Time"
                    value={endTime}
                    onChange={(newEndTime: string) => {
                      if (newEndTime >= startTime || startTime === "00:00") {
                        setEndTime(newEndTime);
                      }
                    }}
                  />
                </div>
              )}

              {/* Guest and Description Inputs */}
              <div className="flex items-center space-x-3">
                <HiOutlineUsers className="size-5 text-slate-600" />
                <InputField
                  type="text"
                  name="guests"
                  placeholder=""
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full rounded-lg border-0 bg-slate-100 pl-7 placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center space-x-3">
                <HiOutlineMenuAlt2 className="size-5 text-slate-600" />
                <InputField
                  type="text"
                  name="description"
                  placeholder=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border-0 bg-slate-100 pl-7 placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-0"
                />
              </div>

              {/* Color Selector */}
              <ColorPicker selectedColor={color} setColor={setColor} />
            </div>

            {/* Save and Delete Buttons */}
            <div className="flex justify-between space-x-2 p-6">
              <Button
                className="w-full bg-green-100 text-green-900 hover:bg-green-100 focus:outline-none"
                onClick={handleSave}
              >
                Save
              </Button>

              <Button
                variant="destructive"
                className="w-full text-black hover:text-black focus:outline-none"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
