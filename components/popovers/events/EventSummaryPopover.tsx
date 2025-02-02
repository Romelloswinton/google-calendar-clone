// Move from components/EventPopover/event-summary-popover.tsx
// Update imports to match new paths
import { useState } from "react";
import dayjs from "dayjs";
import { CalendarEventType, useEventStore } from "@/lib/stores/eventStore";
import { handleAnimationComplete } from "@/lib/utils/eventHandlers";
import { usePopover } from "@/lib/hooks/usePopover";
import { EventForm } from "./form/EventForm";
import { PopoverLayout } from "../layout/PopoverLayout";
import { Button } from "@/components/ui/button";

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
  const { updateEvent, removeEvent } = useEventStore();
  const { isVisible, setIsVisible } = usePopover(isOpen);
  const [formData, setFormData] = useState({ ...event });

  const handleSave = async () => {
    setIsVisible(false);
    await handleAnimationComplete(500);
    updateEvent(formData);
    onClose();
  };

  const handleDelete = async () => {
    setIsVisible(false);
    await handleAnimationComplete(500);
    onClose();
    removeEvent(event.id);
  };

  const handleInputChange =
    (field: keyof typeof formData) => (value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  return (
    <PopoverLayout
      isOpen={isOpen}
      isVisible={isVisible}
      onClose={onClose}
      title="Event Details"
      subtitle={dayjs(event.date).format("dddd, MMMM D, YYYY")}
    >
      <div className="flex flex-col">
        <EventForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          hideSubmitButton
        />

        <div className="p-6">
          <div className="flex justify-between gap-2">
            <Button
              className="w-full bg-green-100 text-green-900 hover:bg-green-100"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="destructive"
              className="w-full text-black hover:text-black"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </PopoverLayout>
  );
}
