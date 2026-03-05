import { ButtonHTMLAttributes } from "react";
import { SpinnerIcon } from "../icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gray" | "red";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  className = "",
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center h-[52px] px-2.5 py-2.5 rounded-[10px] font-semibold transition-colors hover:cursor-pointer focus:outline-none text-button-1 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary-400 text-gray-900 hover:bg-primary-300 active:bg-primary-200 disabled:bg-gray-400",
    gray: "bg-transparent text-gray-800",
    red: "bg-transparent text-accent-red",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <SpinnerIcon /> : children}
    </button>
  );
}
