import { ButtonHTMLAttributes } from "react";

interface CheckSquareProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function CheckSquare({
  isActive = false,
  className = "",
  ...props
}: CheckSquareProps) {
  const baseStyles =
    "flex items-center justify-center rounded-lg hover:cursor-pointer focus:outline-none disabled:cursor-not-allowed";

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {isActive ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="3"
            fill="#E22F83"
            stroke="#E22F83"
            strokeWidth="2"
          />
          <path
            d="M10.7096 16.5C10.3196 16.89 9.68961 16.89 9.29961 16.5L5.70961 12.91C5.31961 12.52 5.31961 11.89 5.70961 11.5C6.09961 11.11 6.72961 11.11 7.11961 11.5L9.99961 14.38L16.8796 7.50002C17.2696 7.11002 17.8996 7.11002 18.2896 7.50002C18.6796 7.89002 18.6796 8.52002 18.2896 8.91002L10.7096 16.5Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6.6C3 4.61177 4.61177 3 6.6 3H17.4C19.3882 3 21 4.61177 21 6.6V17.4C21 19.3882 19.3882 21 17.4 21H6.6C4.61177 21 3 19.3882 3 17.4V6.6Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.4 4.8H6.6C5.60589 4.8 4.8 5.60589 4.8 6.6V17.4C4.8 18.3941 5.60589 19.2 6.6 19.2H17.4C18.3941 19.2 19.2 18.3941 19.2 17.4V6.6C19.2 5.60589 18.3941 4.8 17.4 4.8ZM6.6 3C4.61177 3 3 4.61177 3 6.6V17.4C3 19.3882 4.61177 21 6.6 21H17.4C19.3882 21 21 19.3882 21 17.4V6.6C21 4.61177 19.3882 3 17.4 3H6.6Z"
            fill="#CDD3D8"
          />
        </svg>
      )}
    </button>
  );
}
