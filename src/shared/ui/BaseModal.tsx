"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import { CloseIcon } from "../icons";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  submitLabel: string;
  onSubmit: () => void;
  isSubmitLoading?: boolean;
  isSubmitDisabled?: boolean;
  containerClassName?: string;
  contentClassName?: string;
}

export function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  submitLabel,
  onSubmit,
  isSubmitLoading = false,
  isSubmitDisabled = false,
  containerClassName = "",
  contentClassName = "",
}: BaseModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-5 overflow-y-auto scrollbar-hide">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-100/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-[440px] my-auto transform overflow-hidden rounded-[20px] bg-gray-100 p-7.5 transition-all duration-300 scale-100 opacity-100 border border-gray-400/50 shadow-2xl ${containerClassName}`}
      >
        <div className="flex flex-col gap-7.5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-heading-2 text-gray-900">{title}</h2>
            <button onClick={onClose} className="cursor-pointer">
              <CloseIcon />
            </button>
          </div>

          {/* Main Content Area */}
          <div className={`w-full ${contentClassName}`}>{children}</div>

          {/* Footer - Single Button */}
          <div className="w-full">
            <Button
              onClick={onSubmit}
              isLoading={isSubmitLoading}
              disabled={isSubmitDisabled}
              className="w-full"
            >
              {submitLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
