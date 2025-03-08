import React, { useState } from "react";

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
  const [error, setError] = useState(false);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;

    if (min && newTime < min) {
      setError(true);
      return;
    }

    setError(false);
    onChange(newTime);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-semibold text-gray-800">
        {label}
      </label>
      <input
        type="time"
        value={value}
        onChange={handleTimeChange}
        min={min}
        max={max}
        className={`w-[155px] rounded-md border px-2 py-1.5 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-black focus:ring-blue-500"
        }`}
      />
      <div className="h-4">
        {error && <p className="text-xs text-red-500">Invalid End Time</p>}
      </div>
    </div>
  );
}
