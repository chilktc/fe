"use client";

import { ReactNode } from "react";
import { LogoVertical } from "@/shared/assets/logo";
import { Modal } from "./Modal";

interface LogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
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
  logoClassName?: string;
  titleClassName?: string;
}

export function LogoModal({
  isOpen,
  onClose,
  title,
  children,
  cancelLabel,
  submitLabel,
  showCancelButton,
  onCancel,
  onSubmit,
  isSubmitLoading,
  isSubmitDisabled,
  overlayClassName,
  containerClassName,
  contentClassName,
  footerClassName,
  closeOnOverlayClick,
  logoClassName = "mx-auto h-auto w-50",
  titleClassName = "mt-6 whitespace-pre-line text-center text-heading-6 text-gray-900",
}: LogoModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      cancelLabel={cancelLabel}
      submitLabel={submitLabel}
      showCancelButton={showCancelButton}
      onCancel={onCancel}
      onSubmit={onSubmit}
      isSubmitLoading={isSubmitLoading}
      isSubmitDisabled={isSubmitDisabled}
      overlayClassName={overlayClassName}
      containerClassName={containerClassName}
      contentClassName={contentClassName}
      footerClassName={footerClassName}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <div className="py-4">
        <LogoVertical className={logoClassName} />
        <p className={titleClassName}>{title}</p>
        {children}
      </div>
    </Modal>
  );
}
