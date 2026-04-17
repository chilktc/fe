import { useTicketIssuance } from "@/features/ticket-issuance/model/use-ticket-issuance";
import { Button, Modal } from "@/shared/ui";
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
    shouldShowRestoreModal,
    restoreDraft,
    clearDraft,
  } = useTicketIssuance();

  return (
    <section className="w-full flex-1 flex flex-col min-h-0 justify-between">
      <Modal
        isOpen={shouldShowRestoreModal}
        onClose={clearDraft}
        onCancel={clearDraft}
        onSubmit={restoreDraft}
        cancelLabel="새로 작성"
        submitLabel="이어서 작성"
        closeOnOverlayClick={false}
      >
        <div className="flex flex-col gap-2 text-center">
          <p className="text-heading-6 text-gray-900 whitespace-break-spaces">
            작성 중이던 입장권 정보가 있습니다.{"\n"}이어서 작성하시겠습니까?
          </p>
          <p className="text-body-5 text-gray-700">
            입력하신 정보를 바탕으로 세심하게 추천해드려요
          </p>
        </div>
      </Modal>

      {/* 채팅 영역 */}
      <TicketIssuanceChat
        history={history}
        shouldShowSkip={!isComplete && step === 3 && !isWaiting}
        onSkip={() => handleSendMessage("건너뛰기")}
      />

      {/* 커스텀 인풋 영역 */}
      <div className="relative flex flex-col gap-2 pt-2 pb-4 shrink-0">
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
