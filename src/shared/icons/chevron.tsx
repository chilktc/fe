export function ChevronLeftIcon() {
  return (
    <svg
      width="13"
      height="23"
      viewBox="0 0 13 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.21838 11.3133L12.6464 20.7413L10.761 22.6267L0.390382 12.256C0.140421 12.006 0 11.6669 0 11.3133C0 10.9598 0.140421 10.6207 0.390382 10.3707L10.761 0L12.6464 1.88533L3.21838 11.3133Z"
        fill="#E9EAEE"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8">
        <path
          d="M6.75 13.5L11.25 9L6.75 4.5"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        />
      </g>
    </svg>
  );
}

export function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
