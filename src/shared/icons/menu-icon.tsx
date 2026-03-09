export function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-[24px] h-[24px] ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 9H20M4 15H14"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
