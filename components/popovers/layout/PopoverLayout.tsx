import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import {
  handleClose,
  handlePopoverClick,
  zoom,
} from "@/lib/utils/eventHandlers";
import { Button } from "@/components/ui/button";

interface PopoverLayoutProps {
  isOpen: boolean;
  isVisible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function PopoverLayout({
  children,
  isOpen,
  isVisible,
  onClose,
  title,
  subtitle,
}: PopoverLayoutProps) {
  const handleCloseClick = (e: React.MouseEvent) =>
    handleClose(e, () => {}, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseClick}
        >
          <motion.div
            className="w-full max-w-md overflow-y-auto rounded-lg bg-white shadow-lg"
            onClick={handlePopoverClick}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit="exit"
            variants={zoom}
          >
            <div className="mb-2 flex items-center justify-end rounded-md bg-slate-100 p-1">
              <Button variant="ghost" size="icon" onClick={handleCloseClick}>
                <IoCloseSharp className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold">{title}</h2>
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
