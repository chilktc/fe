import { ButtonHTMLAttributes } from "react";

interface CheckButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary";
}

export function CheckButton({
  variant = "primary",
  className = "",
  ...props
}: CheckButtonProps) {
  const baseStyles =
    "flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:cursor-pointer focus:outline-none disabled:cursor-not-allowed";

  const variants = {
    primary:
      "border bg-primary-400 border-primary-500 hover:bg-primary-300 hover:border-primary-400 disabled:bg-gray-400 disabled:border-gray-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <svg
        width="20"
        height="15"
        viewBox="0 0 20 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.83995 11.7261L17.8013 0.400891C18.0599 0.133631 18.3617 0 18.7066 0C19.0515 0 19.3533 0.133631 19.612 0.400891C19.8707 0.668152 20 0.985746 20 1.35367C20 1.7216 19.8707 2.03875 19.612 2.30512L7.74531 14.5991C7.48663 14.8664 7.18484 15 6.83995 15C6.49505 15 6.19326 14.8664 5.93459 14.5991L0.373088 8.85301C0.114414 8.58575 -0.00975003 8.2686 0.00059694 7.90156C0.0109439 7.53452 0.145885 7.21693 0.405422 6.94877C0.664958 6.68062 0.97235 6.54699 1.3276 6.54788C1.68284 6.54877 1.9898 6.6824 2.24848 6.94877L6.83995 11.7261Z"
          fill="#E9EAEE"
        />
      </svg>
    </button>
  );
}
