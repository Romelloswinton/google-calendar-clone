import React, { useState, useEffect } from "react";
import Checkbox from "./components/Checkbox";
import { useEventForm } from "@/lib/hooks/useEventForm";
import { Button } from "@/components/ui/button";
import InputField from "./components/InputField";
import TimeInput from "./components/TimeInput";
import { ColorPicker } from "./components/ColorPicker";
import { motion, AnimatePresence } from "framer-motion";
import { zoom } from "@/lib/utils/eventHandlers"; // Ensure zoom animation is imported

type FormFields = keyof ReturnType<typeof useEventForm>["formData"];

interface EventFormProps {
  formData: ReturnType<typeof useEventForm>["formData"];
  onInputChange: (field: FormFields) => (value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  hideSubmitButton?: boolean;
}

export function EventForm({
  formData,
  onInputChange,
  onSubmit,
  onClose,
  hideSubmitButton = false,
}: EventFormProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState("");

  // Function to check if form is valid
  const validateForm = () => {
    if (!formData.title.trim()) return false; // Title is always required
    if (!formData.color) return false; // Color is required
    if (!formData.isAllDay && (!formData.startTime || !formData.endTime))
      return false; // Require time fields only if "All Day" is NOT checked
    return true;
  };
  // Handler to close the popover if clicked outside
  useEffect(() => {
    setFormValid(validateForm());
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValid) {
      setError("Please fill out all required fields.");
      return;
    }

    setError("");
    setIsVisible(false); // Trigger exit animation

    // Wait for animation to complete before closing
    setTimeout(() => {
      onSubmit(e);
      onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.form
          className="flex flex-col gap-1 p-4 pt-0"
          onSubmit={handleSubmit}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          exit="exit"
          variants={zoom} // Apply the same zoom animation used in PopoverLayout
        >
          {/* Title Field */}
          <label
            htmlFor="title"
            className="mt-4 text-sm font-semibold text-gray-800"
          >
            Title <span className="text-red-500">*</span>
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
            {/* All Day Checkbox */}
            <Checkbox
              id="allDay"
              label="All Day?"
              checked={formData.isAllDay}
              onChange={(newChecked) => onInputChange("isAllDay")(newChecked)}
            />

            {/* Time Inputs (Only Show if "All Day" is NOT Checked) */}
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

            {/* Color Picker */}
            <label
              htmlFor="color"
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Color <span className="text-red-500">*</span>
            </label>
            <ColorPicker
              selectedColor={formData.color}
              setColor={(color: string) => onInputChange("color")(color)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          {/* Submit Button */}
          {!hideSubmitButton && (
            <div className="mt-5 flex justify-end space-x-2">
              <Button
                type="submit"
                disabled={!formValid}
                className={`w-full border ${
                  formValid
                    ? "border-green-800 bg-green-200 text-green-900 hover:bg-green-800 hover:text-white"
                    : "cursor-not-allowed border-gray-400 bg-gray-200 text-gray-500"
                }`}
              >
                Add
              </Button>
            </div>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
