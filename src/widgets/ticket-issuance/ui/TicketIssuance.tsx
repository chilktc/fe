import { useTicketIssuance } from "@/features/ticket-issuance/model/use-ticket-issuance";
import { Button } from "@/shared/ui";
import { TicketIssuanceChat } from "./TicketIssuanceChat";
import { TicketIssuanceInput } from "./TicketIssuanceInput";

export function TicketIssuance() {
  const {
    step,
    history,
    handleSendMessage,
    isComplete,
    currentPlaceholder,
    submitTicket,
    isSubmitting,
    isWaiting,
  } = useTicketIssuance();

  return (
    <section className="w-full flex-1 flex flex-col min-h-0 justify-between">
      {/* 채팅 영역 */}
      <TicketIssuanceChat history={history} />

      {/* 커스텀 인풋 영역 */}
      <div className="relative flex flex-col gap-2 pt-2 pb-4 shrink-0">
        {!isComplete && step === 3 && !isWaiting && (
          <Button
            onClick={() => handleSendMessage("건너뛰기")}
            disabled={isWaiting}
            className="absolute -top-10 right-0 text-label-1 transition-colors py-2 px-3.5 h-auto! rounded-3xl!"
          >
            건너뛰기
          </Button>
        )}
        {!isComplete ? (
          <TicketIssuanceInput
            onSendMessage={handleSendMessage}
            placeholder={currentPlaceholder}
            disabled={isWaiting}
          />
        ) : (
          <Button
            className="w-full"
            onClick={submitTicket}
            isLoading={isSubmitting}
          >
            입장권 제출하기
          </Button>
        )}
      </div>
    </section>
  );
}
