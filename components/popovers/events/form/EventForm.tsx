import React from "react";
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
    <form className="flex flex-col gap-1 p-4 pt-0" onSubmit={onSubmit}>
      <label
        htmlFor="title"
        className="mt-4 text-sm font-semibold text-gray-800"
      >
        Title
      </label>
      <InputField
        type="text"
        name="title"
        placeholder=""
        value={formData.title}
        onChange={(e) => onInputChange("title")(e.target.value)}
        className="rounded-md border border-black text-2xl focus-visible:border-b-2 focus-visible:border-b-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <div className="mt-2">
        <Checkbox
          id="allDay"
          label="All Day?"
          checked={formData.isAllDay}
          onChange={(newChecked) => onInputChange("isAllDay")(newChecked)}
        />

        {!formData.isAllDay && (
          <div className="mb-2 mt-4 flex items-center gap-1">
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
        <label
          htmlFor="title"
          className="mb-1 text-sm font-semibold text-gray-800"
        >
          Color
        </label>
        <ColorPicker
          selectedColor={formData.color}
          setColor={(color: string) => onInputChange("color")(color)}
        />
      </div>

      {!hideSubmitButton && (
        <div className="mt-5 flex justify-end space-x-2">
          <Button
            onClick={(e) => {
              onSubmit(e);
            }}
            className="w-full border border-green-800 bg-green-200 text-green-900"
          >
            Add
          </Button>
        </div>
      )}
    </form>
  );
}
