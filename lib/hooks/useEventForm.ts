import { useState } from "react";
import dayjs from "dayjs";
import { useEventStore, CalendarEventType } from "@/lib/useEventStore";

export const useEventForm = (date: string, onClose: () => void) => {
  const { addEvent } = useEventStore();
  const [formData, setFormData] = useState({
    title: "",
    color: "",
    isAllDay: false,
    guests: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      color: "",
      isAllDay: false,
      guests: "",
      description: "",
      startTime: "",
      endTime: "",
    });
  };

  const handleInputChange =
    (field: keyof typeof formData) => (value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      const newEvent: CalendarEventType = {
        id: crypto.randomUUID(),
        date: dayjs(date),
        ...formData,
      };

      addEvent(newEvent);
      resetForm();
      onClose();
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};
