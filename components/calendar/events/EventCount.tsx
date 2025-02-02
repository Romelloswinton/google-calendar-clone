import React from "react";

interface EventCountProps {
  count: number;
  onClick: (e: React.MouseEvent) => void;
}

export function EventCount({ count, onClick }: EventCountProps) {
  return (
    <button
      className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-2 text-sm font-medium text-black"
      onClick={onClick}
    >
      +{count} more
    </button>
  );
}
