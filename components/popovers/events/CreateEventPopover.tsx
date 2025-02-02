import React from "react";
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
  console.log("CreateEventPopover render - isOpen:", isOpen);
  const { formData, handleInputChange, handleSubmit } = useEventForm(
    date,
    onClose,
  );

  return (
    <PopoverLayout
      isOpen={isOpen}
      isVisible={true}
      onClose={onClose}
      title="Add Event"
      subtitle={dayjs(date).format("dddd, MMMM D, YYYY")}
    >
      <EventForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </PopoverLayout>
  );
}
