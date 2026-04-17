import { useTrackingData, useTrackingFlow } from "@/features/tracking";
import { ApiError } from "@/shared/api/base";
import { useAppRouter } from "@/shared/lib/router";
import { Button, LogoModal, PageLoading } from "@/shared/ui";
import { useSessionStore } from "@/entities/session/model/store";
import { TrackingStepper } from "./TrackingStepper";
import { Step } from "./Step";
import { SelectionStep } from "./SelectionStep";
import { ResultStep } from "./ResultStep";

interface TrackingProps {
  id: string;
}

export function Tracking({ id }: TrackingProps) {
  const router = useAppRouter();
  const user = useSessionStore((state) => state.user);
  const { data: response, isLoading, error } = useTrackingData(id);
  const {
    step,
    currentPath,
    selections,
    stepData,
    resultData,
    isSubmitting,
    isNextDisabled,
    selectStep1,
    selectStepOption,
    goNext,
  } = useTrackingFlow(id);

  if (isLoading) {
    return <PageLoading className="bg-gray-100" />;
  }

  if (error) {
    const displayName = user?.nickname?.trim() || "사용자";
    const isResolvedTicketError =
      error instanceof ApiError && error.code === "ALREADY_RESOLVED_TICKET";
    const title = isResolvedTicketError
      ? `${displayName}님\n이미 고민을 해결하셨군요~!`
      : "트래킹 정보를\n불러오지 못했어요.";
    const description = isResolvedTicketError
      ? "다른 고민 상담하러 가실까요?"
      : error instanceof Error
        ? error.message
        : "잠시 후 다시 시도해주세요.";

    return (
      <LogoModal
        isOpen
        onClose={() => router.push("/")}
        title={title}
        submitLabel="홈으로 돌아가기"
        showCancelButton={false}
        onSubmit={() => router.push("/")}
        containerClassName="max-w-[276px] rounded-[10px] px-4 pb-6 pt-5"
        contentClassName="pt-0"
      >
        <div className="mt-2 flex flex-col items-center">
          <p className="mt-2 text-center text-body-7 text-gray-500">
            {description}
          </p>
        </div>
      </LogoModal>
    );
  }

  if (!response?.data) return null;

  if (step === 4 && resultData) {
    return (
      <ResultStep
        data={response.data}
        title={resultData.title}
        description={resultData.description}
        buttonLabel={resultData.button}
        isShareFlow={currentPath === "solved"}
        onAction={() => router.push("/")}
      />
    );
  }

  return (
    <div className="relative flex-1 min-h-dvh w-full overflow-hidden flex flex-col py-5">
      {step > 0 && step < 4 && (
        <TrackingStepper currentStep={step} totalSteps={3} />
      )}

      <main className="flex-1 flex flex-col overflow-hidden min-h-0 pt-2.5">
        {step === 1 && (
          <Step
            data={response.data}
            selection={selections.step1}
            onSelect={(value) => selectStep1(value as "solved" | "not-solved")}
          />
        )}
        {step > 1 && stepData && (
          <SelectionStep
            title={stepData.title}
            options={stepData.options}
            selection={step === 2 ? selections.step2 : selections.step3}
            onSelect={selectStepOption}
          />
        )}
      </main>

      <div className="px-4">
        <Button
          className={`w-full h-14 text-button-1 ${
            isNextDisabled
              ? "bg-gray-400 text-gray-800 opacity-100"
              : "bg-primary-400 text-gray-900"
          }`}
          onClick={goNext}
          disabled={isNextDisabled || isSubmitting}
        >
          {isSubmitting ? "제출 중..." : "계속하기"}
        </Button>
      </div>
    </div>
  );
}
