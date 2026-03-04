import { ChatMessage } from "@/entities/ticket/model/types";

interface TicketIssuanceMessageProps {
  message: ChatMessage;
  isLatestSystem?: boolean;
}

export function TicketIssuanceMessage({
  message,
  isLatestSystem,
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
      <div className="flex justify-start py-4">
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
        <div className="flex justify-start">
          <p className="text-body-5 text-gray-600">{message.guide}</p>
        </div>
      )}
    </>
  );
}
