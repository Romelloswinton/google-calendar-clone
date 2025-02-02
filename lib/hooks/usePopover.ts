import { useState, useEffect } from "react";

export function usePopover(isOpen: boolean) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  return {
    isVisible,
    setIsVisible,
  };
}
