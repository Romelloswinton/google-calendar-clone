import React from "react";

interface TimeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm text-gray-700">{label}</label>
      <input
        type="time"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className="w-32 rounded-md border-2 border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        min={min}
        max={max}
      />
    </div>
  );
};

export default TimeInput;
