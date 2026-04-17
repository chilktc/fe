import { Modal } from "@/shared/ui";
import {
  AGREEMENT_CONTENTS,
  AgreementContentKey,
  AgreementContentView,
} from "./agreement-content";

interface AgreementDetailModalProps {
  agreementKey: AgreementContentKey | null;
  onClose: () => void;
}

export function AgreementDetailModal({
  agreementKey,
  onClose,
}: AgreementDetailModalProps) {
  if (!agreementKey) {
    return null;
  }

  const content = AGREEMENT_CONTENTS[agreementKey];

  return (
    <Modal
      isOpen={Boolean(agreementKey)}
      onClose={onClose}
      onSubmit={onClose}
      submitLabel="확인"
      showCancelButton={false}
      containerClassName="max-w-[440px]! rounded-[20px] border-gray-400/50 bg-gray-100 p-6"
      contentClassName="max-h-[calc(100dvh-180px)] overflow-y-auto pr-1"
      footerClassName="pt-1"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-heading-2 text-gray-900">{content.title}</h2>
        </div>

        <AgreementContentView contentKey={agreementKey} />
      </div>
    </Modal>
  );
}
