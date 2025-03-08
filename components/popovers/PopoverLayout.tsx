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
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  day: dayjs.Dayjs;
  initialFocusRef?: React.RefObject<HTMLElement>;
  description?: string; // Optional description for aria-describedby
  contentId?: string; // Optional ID for the content area
}

export function PopoverLayout({
  children,
  isOpen,
  onClose,
  title,
  day,
  initialFocusRef,
  description,
  contentId = "popover-content",
}: PopoverLayoutProps) {
  const [isVisible, setIsVisible] = useState(true);
  const popoverRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const descriptionId = description ? "popover-description" : undefined;

  // Store previously focused element to restore focus when popover closes
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsVisible(false); // Trigger animation first
      }
    };

    // Add event listener for ESC key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false); // Trigger animation first
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);

      // Store currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Set focus after the component renders and animation completes
      setTimeout(() => {
        // Focus on initialFocusRef if provided, otherwise focus on close button or popover itself
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus();
        } else if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        } else if (popoverRef.current) {
          popoverRef.current.focus();
        }
      }, 100); // Small delay to ensure DOM is ready and animation has started
    } else if (previousFocusRef.current) {
      // Restore focus when popover closes
      previousFocusRef.current.focus();
    }
  }, [isOpen, initialFocusRef]);

  // Trap focus within the popover when open
  useEffect(() => {
    if (!isOpen || !popoverRef.current) return;

    const popover = popoverRef.current;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      // Get all focusable elements
      const focusableElements = popover.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      // If shift+tab on first element, move to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // If tab on last element, move to first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => {
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen]);

  // Announce dialog open/close to screen readers
  useEffect(() => {
    // Create live region for announcements if it doesn't exist
    let liveRegion = document.getElementById("popover-live-region");
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = "popover-live-region";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.className = "sr-only";
      document.body.appendChild(liveRegion);
    }

    // Announce when dialog opens
    if (isOpen) {
      liveRegion.textContent = `Dialog ${title} opened.`;
    }

    // Cleanup function
    return () => {
      if (liveRegion && !isOpen) {
        liveRegion.textContent = `Dialog closed.`;
      }
    };
  }, [isOpen, title]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="presentation"
          aria-hidden="true"
        >
          <motion.div
            ref={popoverRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popover-title"
            aria-describedby={descriptionId}
            className="w-full max-w-[345px] overflow-y-auto rounded-lg bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit="exit"
            variants={zoom}
            onAnimationComplete={async () => {
              if (!isVisible) {
                await handleAnimationComplete();
                onClose();
              }
            }}
          >
            <div className="flex items-center justify-between border-gray-200 p-4 pb-0">
              <h2 id="popover-title" className="mr-2 text-2xl font-semibold">
                {title}
              </h2>
              <span
                className="mx-4 text-xl text-gray-600"
                aria-label={`Date: ${day.format("MMMM D, YYYY")}`}
              >
                {day.format("M/DD/YY")}
              </span>
              <Button
                ref={closeButtonRef}
                variant="ghost"
                size="icon"
                aria-label="Close dialog"
                onClick={(e) => handleClose(e, setIsVisible, onClose)}
              >
                <IoCloseSharp className="h-4 w-4" />
              </Button>
            </div>

            {description && (
              <div id={descriptionId} className="sr-only">
                {description}
              </div>
            )}

            <div id={contentId} className="popover-content">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
