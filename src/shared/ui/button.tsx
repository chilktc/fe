import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gray" | "red";
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-[10px] font-semibold transition-colors hover:cursor-pointer focus:outline-none text-button-1 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary-400 text-gray-900 hover:bg-primary-300 active:bg-primary-200 disabled:bg-gray-400",
    gray: "bg-transparent text-gray-800",
    red: "bg-transparent text-accent-red",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
