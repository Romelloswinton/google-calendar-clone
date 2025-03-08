import React from "react";
import { cn } from "@/lib/utils/utils";

interface ColorPickerProps {
  selectedColor: string;
  setColor: (color: string) => void;
}

export function ColorPicker({ selectedColor, setColor }: ColorPickerProps) {
  // Custom color values with HSL
  const colorOptions = [
    { id: "red-event", value: "hsl(0, 75%, 60%)" },
    { id: "green-event", value: "hsl(150, 80%, 30%)" },
    { id: "blue-event", value: "hsl(200, 80%, 50%)" },
  ];

  return (
    <div className="-mb-2 flex items-center gap-2">
      {colorOptions.map((color) => (
        <button
          key={color.id}
          type="button"
          className={cn(
            "h-8 w-8 rounded-md transition duration-200 hover:scale-110",
            selectedColor === color.value && "border-2 border-black",
          )}
          style={{ backgroundColor: color.value }}
          onClick={() => setColor(color.value)}
        />
      ))}
    </div>
  );
}
