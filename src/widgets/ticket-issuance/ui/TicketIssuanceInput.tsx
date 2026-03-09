import { useState, useRef, useEffect } from "react";
import { CheckCircle } from "@/shared/ui";

interface TicketIssuanceInputProps {
  onSendMessage: (content: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export function TicketIssuanceInput({
  onSendMessage,
  placeholder,
  disabled,
}: TicketIssuanceInputProps) {
  const [inputValue, setInputValue] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
    if (textarea.current) {
      textarea.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResizeHeight = () => {
    if (!textarea.current) return;
    textarea.current.style.height = "auto";
    const maxHeight = 110; // 약 4줄 높이
    textarea.current.style.height =
      Math.min(textarea.current.scrollHeight, maxHeight) + "px";
    //
  };

  // disabled 상태가 바뀌어서 false가 됐을 때 자동 초점
  useEffect(() => {
    if (!disabled && textarea.current) {
      textarea.current.focus();
    }
  }, [disabled]);

  return (
    <div
      className={`relative w-full flex items-center rounded-[18px] border bg-gray-100 border-gray-400 focus-within:border-primary-600 transition-all pr-14 ${disabled ? "opacity-50 grayscale-20" : ""}`}
    >
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={2}
        ref={textarea}
        onInput={handleResizeHeight}
        disabled={disabled}
        className="w-full bg-transparent px-5 py-4 text-white placeholder-gray-400 outline-none text-body-4 resize-none overflow-y-auto max-h-[120px] scrollbar-hide disabled:cursor-not-allowed"
      />
      {inputValue.trim() && (
        <CheckCircle
          onClick={handleSendMessage}
          disabled={disabled || !inputValue.trim()}
          className="absolute right-4 bottom-4 shrink-0 transition-opacity"
        />
      )}
    </div>
  );
}
