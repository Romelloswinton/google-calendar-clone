import React, { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import { useEventForm } from "@/lib/hooks/useEventForm";
import { Button } from "@/components/ui/button";
import InputField from "./InputField";
import TimeInput from "./TimeInput";
import { ColorPicker } from "./ColorPicker";
import { motion, AnimatePresence } from "framer-motion";
import { zoom } from "@/lib/utils/eventHandlers";

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

  // Update form validity when form data changes
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

  // Generate unique IDs for form elements
  const formId = "event-form";
  const titleId = "event-title";
  const errorId = "form-error-message";
  const allDayId = "all-day-checkbox";
  const colorPickerId = "color-picker";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.form
          id={formId}
          className="flex flex-col gap-1 p-4 pt-0"
          onSubmit={handleSubmit}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          exit="exit"
          variants={zoom}
          aria-labelledby="form-heading"
          aria-describedby={error ? errorId : undefined}
          noValidate
        >
          <h2 id="form-heading" className="sr-only">
            Event Details Form
          </h2>

          {/* Title Field */}
          <label
            htmlFor={titleId}
            className="mt-4 text-sm font-semibold text-gray-800"
          >
            Title{" "}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </label>
          <InputField
            type="text"
            name="title"
            placeholder=""
            value={formData.title}
            onChange={(e) => onInputChange("title")(e.target.value)}
            className="rounded-md border border-black text-2xl focus-visible:border-b-2 focus-visible:border-b-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-required="true"
            aria-invalid={!formData.title.trim() ? "true" : "false"}
          />

          <div className="mt-2">
            {/* All Day Checkbox */}
            <Checkbox
              id={allDayId}
              label="All Day?"
              checked={formData.isAllDay}
              onChange={(newChecked) => onInputChange("isAllDay")(newChecked)}
              aria-controls={formData.isAllDay ? "" : "time-inputs-section"}
            />

            {/* Time Inputs (Only Show if "All Day" is NOT Checked) */}
            {!formData.isAllDay && (
              <div
                id="time-inputs-section"
                className="mb-2 mt-4 flex items-center gap-1"
                aria-live="polite"
              >
                <TimeInput
                  label="Start Time"
                  value={formData.startTime}
                  onChange={(newTime) => onInputChange("startTime")(newTime)}
                  aria-required="true"
                  aria-invalid={!formData.startTime ? "true" : "false"}
                />
                <TimeInput
                  label="End Time"
                  value={formData.endTime}
                  onChange={(newTime) => onInputChange("endTime")(newTime)}
                  min={formData.startTime}
                  aria-required="true"
                  aria-invalid={!formData.endTime ? "true" : "false"}
                />
              </div>
            )}

            {/* Color Picker */}
            <label
              htmlFor={colorPickerId}
              className="mb-1 text-sm font-semibold text-gray-800"
            >
              Color{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
              <span className="sr-only"> (required)</span>
            </label>
            <ColorPicker
              selectedColor={formData.color}
              setColor={(color: string) => onInputChange("color")(color)}
              aria-required="true"
              aria-invalid={!formData.color ? "true" : "false"}
              aria-label="Select event color"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p
              id={errorId}
              className="mt-2 text-sm text-red-500"
              aria-live="assertive"
              role="alert"
            >
              {error}
            </p>
          )}

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
                aria-disabled={!formValid}
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
