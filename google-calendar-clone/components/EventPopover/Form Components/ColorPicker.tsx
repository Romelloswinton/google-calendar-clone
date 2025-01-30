import React from "react";

interface ColorPickerProps {
  selectedColor: string;
  setColor: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  setColor,
}) => {
  const colors = ["red", "green", "skyblue"]; // Use specified colors

  return (
    <div
      className="flex space-x-2"
      onClick={(e) => e.stopPropagation()} // Prevent click propagation
    >
      {colors.map((color) => (
        <button
          key={color}
          type="button" // Add type="button" here
          onClick={() => setColor(color)}
          className={`h-6 w-6 rounded-full ${
            selectedColor === color ? "ring-2 ring-blue-500 ring-offset-1" : ""
          }`}
          style={{ backgroundColor: color }}
          aria-label={`Select color ${color}`}
        />
      ))}
    </div>
  );
};
