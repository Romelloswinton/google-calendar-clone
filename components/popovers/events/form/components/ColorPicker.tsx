import React from "react";
import { cn } from "@/lib/utils/utils";

interface ColorPickerProps {
  selectedColor: string;
  setColor: (color: string) => void;
}

export function ColorPicker({ selectedColor, setColor }: ColorPickerProps) {
  const colors = ["bg-red-500", "bg-green-600", "bg-blue-500"];

  return (
    <div className="-mb-2 flex items-center gap-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          className={cn(
            "h-8 w-8 rounded-md transition duration-200 hover:scale-110",
            color, // Apply Tailwind background color
            selectedColor === color && "border-2 border-black",
          )}
          onClick={() => setColor(color)}
        />
      ))}
    </div>
  );
}
