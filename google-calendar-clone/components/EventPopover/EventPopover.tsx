import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import {
  HiOutlineMenuAlt2,
  HiOutlineMenuAlt4,
  HiOutlineUsers,
} from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { useEventStore } from "@/lib/useEventStore";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
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

interface EventPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
}

export default function EventPopover({
  isOpen,
  onClose,
  date,
}: EventPopoverProps) {
  const { addEvent } = useEventStore();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);
  const [guests, setGuests] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      const newEvent = {
        id: crypto.randomUUID(),
        title,
        date: dayjs(date),
        description,
        color,
        isAllDay,
        startTime,
        endTime,
        guests,
      };
      setIsVisible(false);
      addEvent(newEvent);

      await handleAnimationComplete(500);
      resetForm();
      onClose();
    }
  };
  const resetForm = () => {
    setTitle("");
    setStartTime("");
    setDescription("");
    setColor("");
    setIsAllDay(false);
    setGuests("");
    setEndTime("");
  };

  const handleCloseClick = (e: React.MouseEvent) =>
    handleClose(e, setIsVisible, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseClick}
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
            {/* Your content here */}
            <div className="mb-2 flex items-center justify-between rounded-md bg-slate-100 p-1">
              <HiOutlineMenuAlt4 />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleCloseClick}
              >
                <IoCloseSharp className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold">Add Event</h2>
              <p className="text-sm text-gray-600">
                {dayjs(date).format("dddd, MMMM D, YYYY")}
              </p>
            </div>

            <form className="space-y-4 p-6" onSubmit={handleSubmit}>
              {/* Title Input */}
              <InputField
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="my-4 rounded-none border-0 border-b text-2xl focus-visible:border-b-2 focus-visible:border-b-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              {/* All Day Checkbox */}
              <Checkbox
                id="allDay"
                label="All Day?"
                checked={isAllDay}
                onChange={(newChecked) => setIsAllDay(newChecked)}
              />

              {/* Time Section (Only if not all day) */}
              {!isAllDay && (
                <div className="flex space-x-6">
                  {/* Start Time */}
                  <TimeInput
                    label="Start Time"
                    value={startTime}
                    onChange={(newStartTime: string) => {
                      if (newStartTime <= endTime || endTime === "") {
                        setStartTime(newStartTime);
                      }
                    }}
                  />

                  {/* End Time */}
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

              {/* Guests Input */}
              <div className="flex items-center space-x-3">
                <HiOutlineUsers className="size-5 text-slate-600" />
                <InputField
                  type="text"
                  name="guests"
                  placeholder="Add guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full rounded-lg border-0 bg-slate-100 pl-7 placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-0"
                />
              </div>

              {/* Description Input */}
              <div className="flex items-center space-x-3">
                <HiOutlineMenuAlt2 className="size-5 text-slate-600" />
                <InputField
                  type="text"
                  name="description"
                  placeholder="Add description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border-0 bg-slate-100 pl-7 placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-0"
                />
              </div>

              {/* Color Buttons */}
              <ColorPicker selectedColor={color} setColor={setColor} />

              {/* Save Button */}
              <div className="flex justify-end space-x-2">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
