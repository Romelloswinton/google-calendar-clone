import React, { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import {
  handleAnimationComplete,
  handleClose,
  zoom,
} from "@/lib/utils/eventHandlers";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
interface PopoverLayoutProps {
  isOpen: boolean;
  isVisible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  day: dayjs.Dayjs;
}

export function PopoverLayout({
  children,
  isOpen,
  onClose,
  title,
  day,
}: PopoverLayoutProps) {
  const [isVisible, setIsVisible] = useState(true);

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handler to close the popover if clicked outside
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        onClose(); // Close the popover when clicked outside
      }
    };

    // Add event listener when the popover is open
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup event listener when the component is unmounted or popover closes
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            ref={popoverRef}
            className="w-full max-w-[345px] overflow-y-auto rounded-lg bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit="exit"
            variants={zoom}
            onAnimationComplete={async () => {
              if (!isOpen) {
                await handleAnimationComplete();
                onClose();
              }
            }}
          >
            <div className="flex items-center justify-between border-gray-200 p-4 pb-0">
              <h2 className="mr-2 text-2xl font-semibold">{title}</h2>
              <span className="mx-4 text-xl text-gray-600">
                {day.format("M/DD/YY")}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleClose(e, setIsVisible, onClose)}
              >
                <IoCloseSharp className="h-4 w-4" />
              </Button>
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
