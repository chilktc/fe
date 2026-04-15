import { Button } from "@/shared/ui";
import { ChatMessage } from "@/entities/ticket/model/types";

interface TicketIssuanceMessageProps {
  message: ChatMessage;
  isLatestSystem?: boolean;
  shouldShowSkip?: boolean;
  onSkip?: () => void;
}

export function TicketIssuanceMessage({
  message,
  isLatestSystem,
  shouldShowSkip = false,
  onSkip,
}: TicketIssuanceMessageProps) {
  const isUser = message.type === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[90%] px-5 py-3 bg-gray-200 border border-gray-400 rounded-2xl text-gray-900 text-body-5 whitespace-pre-wrap wrap-break-word">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-start min-h-[50px] items-center">
        <div className="flex items-start gap-1.5">
          {isLatestSystem ? (
            <div className="w-2 h-2 rounded-full border border-primary-400 bg-transparent" />
          ) : (
            <div className="w-2 h-2 rounded-full border border-primary-400 bg-primary-400" />
          )}
          <div className="text-gray-900 text-body-5 transition-all">
            {message.content}
          </div>
        </div>
      </div>
      {isLatestSystem && message.guide && (
        <div className="flex justify-start w-[90%] px-4">
          <p className="text-body-7 text-gray-600 whitespace-pre-wrap wrap-break-word">
            {message.guide}
          </p>
        </div>
      )}
      {shouldShowSkip ? (
        <div className="flex justify-end mt-3">
          <Button
            onClick={onSkip}
            className="text-label-1! transition-colors py-2! px-3.5! h-auto! rounded-3xl! bg-gray-200! border border-primary-400 text-primary-400!"
          >
            건너뛰기
          </Button>
        </div>
      ) : null}
    </>
  );
}
