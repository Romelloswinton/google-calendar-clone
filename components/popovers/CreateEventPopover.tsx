import React, { useCallback } from "react";
import { PopoverLayout } from "./PopoverLayout";
import { EventForm } from "../Forms/EventForm";
import { useEventForm } from "@/lib/hooks/useEventForm";
import dayjs from "dayjs";

interface CreateEventPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
}

export default function CreateEventPopover({
  isOpen,
  onClose,
  date,
}: CreateEventPopoverProps) {
  const { formData, handleInputChange, handleSubmit } = useEventForm(
    date,
    onClose,
  );

  const onCloseWithAnimation = useCallback(() => {
    setTimeout(() => {
      onClose(); // Call the parent's onClose after the animation is complete
    }, 300); // 300ms timeout, adjust for your animation duration
  }, [onClose]);

  // Format the date for the aria-label
  const formattedDate = dayjs(date).format("MMMM D, YYYY");

  return (
    <PopoverLayout
      isOpen={isOpen}
      onClose={onCloseWithAnimation}
      title="Add Event"
      day={dayjs(date)}
      aria-modal="true"
      aria-label={`Create event for ${formattedDate}`}
    >
      <div aria-live="polite" aria-atomic="true">
        <EventForm
          onClose={onCloseWithAnimation}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          aria-describedby="event-form-description"
        />
        <div id="event-form-description" className="sr-only">
          Form to create a new event on {formattedDate}. Fill out the event
          details and submit to save.
        </div>
      </div>
    </PopoverLayout>
  );
}
