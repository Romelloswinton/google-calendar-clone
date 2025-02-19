import React, { useState, useCallback } from "react";
import { PopoverLayout } from "../layout/PopoverLayout";
import { EventForm } from "./form/EventForm";
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

  const [isVisible, setIsVisible] = useState(isOpen);

  const onCloseWithAnimation = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(); // Call the parent's onClose after the animation is complete
    }, 300); // 300ms timeout, adjust for your animation duration
  }, [onClose]);

  return (
    <PopoverLayout
      isOpen={isOpen}
      isVisible={true}
      onClose={onCloseWithAnimation}
      title="Add Event"
      day={dayjs(date)}
    >
      <EventForm
        onClose={onCloseWithAnimation}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </PopoverLayout>
  );
}
