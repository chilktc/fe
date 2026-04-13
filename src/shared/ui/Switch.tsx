interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export function Switch({
  checked,
  onChange,
  className = "",
  disabled = false,
}: SwitchProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative shrink-0 w-12 h-6.5 rounded-full transition-colors duration-200 focus:outline-none cursor-pointer disabled:cursor-not-allowed ${
        checked ? "bg-primary-400" : "bg-gray-400"
      } ${className}`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5.5 h-5.5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
          checked ? "translate-x-5.5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
