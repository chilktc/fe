export function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-12 h-12 ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="13"
        y1="20.5"
        x2="35"
        y2="20.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
      <line
        x1="13"
        y1="29.5"
        x2="29"
        y2="29.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
