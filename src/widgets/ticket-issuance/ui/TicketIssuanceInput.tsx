import { useState, useRef, useEffect } from "react";
import { CheckCircle } from "@/shared/ui";
import { ANSWER_MAX_LENGTH } from "@/entities/ticket/model/constants";

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
  const [errorMessage, setErrorMessage] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) {
      setErrorMessage("답변을 입력해 주세요.");
      return;
    }

    onSendMessage(inputValue);
    setInputValue("");
    setErrorMessage("");
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

  const isNearLimit = inputValue.length >= ANSWER_MAX_LENGTH;

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`relative w-full flex items-center rounded-[18px] border bg-gray-100 border-gray-400 focus-within:border-primary-600 transition-all pr-14 ${disabled ? "opacity-50 grayscale-20" : ""}`}
      >
        <textarea
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value.slice(0, ANSWER_MAX_LENGTH));
            if (errorMessage && e.target.value.trim()) {
              setErrorMessage("");
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={2}
          ref={textarea}
          onInput={handleResizeHeight}
          disabled={disabled}
          maxLength={ANSWER_MAX_LENGTH}
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
      <div className="flex items-center justify-between gap-3 px-1">
        <p
          aria-live="polite"
          className={`text-label-3 ${
            errorMessage ? "text-accent-red" : "text-gray-600"
          }`}
        >
          {errorMessage || "빈 메시지는 보낼 수 없습니다. (최대 300자)"}
        </p>
        <span
          className={`shrink-0 text-label-3 ${
            isNearLimit ? "text-primary-400" : "text-gray-600"
          }`}
        >
          {inputValue.length}/{ANSWER_MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
