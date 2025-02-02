import React from "react";

interface TimeInputProps {
  label: string;
  value: string;
  onChange: (newTime: string) => void;
  min?: string;
  max?: string;
}

export default function TimeInput({
  label,
  value,
  onChange,
  min,
  max,
}: TimeInputProps) {
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;

    // If min time is set, validate the new time
    if (min && newTime < min) {
      // If invalid, set to min time instead
      onChange(min);
      return;
    }

    onChange(newTime);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm text-gray-700">{label}</label>
      <input
        type="time"
        value={value}
        onChange={handleTimeChange}
        min={min}
        max={max}
        className="w-32 rounded-md border-2 border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
