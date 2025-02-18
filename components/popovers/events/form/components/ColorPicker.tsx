import React from "react";
import { cn } from "@/lib/utils/utils";

interface ColorPickerProps {
  selectedColor: string;
  setColor: (color: string) => void;
}

export function ColorPicker({ selectedColor, setColor }: ColorPickerProps) {
  const colors = ["red", "green", "lightblue"];

  return (
    <div className="-mb-2 flex items-center gap-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          className={cn(
            "h-8 w-8 rounded-md",
            selectedColor === color && "border border-black",
          )}
          style={{ backgroundColor: color }}
          onClick={() => setColor(color)}
        />
      ))}
    </div>
  );
}
