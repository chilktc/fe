"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  cancelLabel?: string;
  submitLabel?: string;
  showCancelButton?: boolean;
  onCancel?: () => void;
  onSubmit: () => void;
  isSubmitLoading?: boolean;
  isSubmitDisabled?: boolean;
  overlayClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  closeOnOverlayClick?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  cancelLabel = "취소",
  submitLabel = "확인",
  showCancelButton = true,
  onCancel,
  onSubmit,
  isSubmitLoading = false,
  isSubmitDisabled = false,
  overlayClassName = "",
  containerClassName = "",
  contentClassName = "",
  footerClassName = "",
  closeOnOverlayClick = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCancel = onCancel || onClose;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gray-100/40 transition-opacity duration-300 ${overlayClassName}`}
        onClick={(e) => {
          e.stopPropagation();
          if (closeOnOverlayClick) {
            onClose();
          }
        }}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-sm transform overflow-hidden rounded-[10px] bg-gray-200 p-4 transition-all duration-300 scale-100 opacity-100 border border-gray-400 ${containerClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-5">
          {/* Main Content Area */}
          <div className={`w-full ${contentClassName}`}>{children}</div>

          {/* Fixed Footer with Two Buttons */}
          <div className={`flex w-full gap-1 ${footerClassName}`}>
            {showCancelButton && (
              <Button onClick={handleCancel} className="flex-1 bg-gray-400!">
                {cancelLabel}
              </Button>
            )}
            <Button
              onClick={onSubmit}
              isLoading={isSubmitLoading}
              disabled={isSubmitDisabled}
              className={showCancelButton ? "flex-1" : "w-full"}
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
