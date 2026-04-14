"use client";

import { ReactNode, useEffect } from "react";
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
  overlayClassName?: string;
  containerClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  closeButtonClassName?: string;
  contentClassName?: string;
  submitClassName?: string;
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
  overlayClassName = "",
  containerClassName = "",
  headerClassName = "",
  titleClassName = "",
  closeButtonClassName = "",
  contentClassName = "",
  submitClassName = "",
}: BaseModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto p-5 scrollbar-hide">
      <div
        className={`fixed inset-0 bg-gray-100/40 backdrop-blur-sm transition-opacity duration-300 ${overlayClassName}`}
        onClick={onClose}
      />

      <div
        className={`relative my-auto w-full max-w-[440px] overflow-hidden rounded-[20px] border border-gray-400/50 bg-gray-100 p-7.5 shadow-2xl ${containerClassName}`}
      >
        <div className="flex flex-col gap-7.5">
          <div className={`flex items-center justify-between ${headerClassName}`}>
            <h2 className={`text-heading-2 text-gray-900 ${titleClassName}`}>
              {title}
            </h2>
            <button
              onClick={onClose}
              className={`cursor-pointer ${closeButtonClassName}`}
            >
              <CloseIcon />
            </button>
          </div>

          <div className={`w-full ${contentClassName}`}>{children}</div>

          <div className="w-full">
            <Button
              onClick={onSubmit}
              isLoading={isSubmitLoading}
              disabled={isSubmitDisabled}
              className={`w-full ${submitClassName}`}
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
