import React from "react";
import { HiOutlineMenuAlt2, HiOutlineUsers } from "react-icons/hi";

import Checkbox from "./components/Checkbox";
import { useEventForm } from "@/lib/hooks/useEventForm";
import { Button } from "@/components/ui/button";
import InputField from "./components/InputField";
import TimeInput from "./components/TimeInput";
import { ColorPicker } from "./components/ColorPicker";
type FormFields = keyof ReturnType<typeof useEventForm>["formData"];

interface EventFormProps {
  formData: ReturnType<typeof useEventForm>["formData"];
  onInputChange: (field: FormFields) => (value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  hideSubmitButton?: boolean;
}

export function EventForm({
  formData,
  onInputChange,
  onSubmit,
  hideSubmitButton = false,
}: EventFormProps) {
  return (
    <form className="flex flex-col p-6" onSubmit={onSubmit}>
      <InputField
        type="text"
        name="title"
        placeholder="Add title"
        value={formData.title}
        onChange={(e) => onInputChange("title")(e.target.value)}
        className="my-4 rounded-none border-0 border-b text-2xl focus-visible:border-b-2 focus-visible:border-b-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <div className="flex flex-col gap-4">
        <Checkbox
          id="allDay"
          label="All Day?"
          checked={formData.isAllDay}
          onChange={(newChecked) => onInputChange("isAllDay")(newChecked)}
        />

        {!formData.isAllDay && (
          <div className="flex space-x-6">
            <TimeInput
              label="Start Time"
              value={formData.startTime}
              onChange={(newTime) => onInputChange("startTime")(newTime)}
            />
            <TimeInput
              label="End Time"
              value={formData.endTime}
              onChange={(newTime) => onInputChange("endTime")(newTime)}
              min={formData.startTime}
            />
          </div>
        )}

        <div className="flex items-center space-x-3">
          <HiOutlineUsers className="size-5 text-slate-600" />
          <InputField
            type="text"
            name="guests"
            placeholder="Add guests"
            value={formData.guests}
            onChange={(e) => onInputChange("guests")(e.target.value)}
            className="w-full rounded-lg border-0 bg-slate-100 pl-7 placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center space-x-3">
          <HiOutlineMenuAlt2 className="size-5 text-slate-600" />
          <InputField
            type="text"
            name="description"
            placeholder="Add description"
            value={formData.description}
            onChange={(e) => onInputChange("description")(e.target.value)}
            className="w-full rounded-lg border-0 bg-slate-100 pl-7 placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-0"
          />
        </div>

        <ColorPicker
          selectedColor={formData.color}
          setColor={(color: string) => onInputChange("color")(color)}
        />
      </div>

      {!hideSubmitButton && (
        <div className="mt-4 flex justify-end space-x-2">
          <Button type="submit">Save</Button>
        </div>
      )}
    </form>
  );
}
