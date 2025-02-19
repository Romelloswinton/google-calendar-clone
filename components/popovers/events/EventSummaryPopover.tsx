import { useCallback, useState, useEffect } from "react";
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
  const [isValid, setIsValid] = useState(false);

  const checkFormValidity = () => {
    if (!formData.isAllDay && (!formData.startTime || !formData.endTime)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  useEffect(() => {
    checkFormValidity();
  }, [formData]);

  const handleSave = async () => {
    updateEvent(formData);
  };

  // Close with animation
  const onCloseWithAnimation = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

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
      isVisible={true}
      onClose={onCloseWithAnimation}
      title="Event Details"
      day={dayjs(event.date)}
    >
      <div className="flex flex-col">
        <EventForm
          onClose={onCloseWithAnimation}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          hideSubmitButton
        />

        <div className="p-2">
          <div className="flex justify-between gap-2">
            <Button
              className="w-full border border-black bg-green-100 text-green-900 hover:bg-green-100"
              onClick={(e) => {
                e.stopPropagation();
                onCloseWithAnimation();
                handleSave();
              }}
              disabled={!isValid} // Disable Save button if the form is not valid
            >
              Save
            </Button>
            <Button
              variant="destructive"
              className="w-full border border-black text-black hover:text-black"
              onClick={handleDelete}
              disabled={!isValid} // Disable Delete button if the form is not valid
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </PopoverLayout>
  );
}
