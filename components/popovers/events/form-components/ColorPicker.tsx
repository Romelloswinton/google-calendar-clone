import React from "react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  selectedColor: string;
  setColor: (color: string) => void;
}

export function ColorPicker({ selectedColor, setColor }: ColorPickerProps) {
  const colors = ["red", "green", "skyblue"]; // Use specified colors

  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          className={cn(
            "h-6 w-6 rounded-full",
            selectedColor === color && "ring-2 ring-offset-2",
          )}
          style={{ backgroundColor: color }}
          onClick={() => setColor(color)}
        />
      ))}
    </div>
  );
}
