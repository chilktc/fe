"use client";

import { useTrackingData, useTrackingFlow } from "@/features/tracking";
import { Button, PageLoading } from "@/shared/ui";
import { TrackingStepper } from "./TrackingStepper";
import { Step } from "./Step";
import { SelectionStep } from "./SelectionStep";

interface TrackingProps {
  id: string;
}

export function Tracking({ id }: TrackingProps) {
  const { data: response, isLoading } = useTrackingData(id);
  const {
    step,
    selections,
    stepData,
    isSubmitting,
    isNextDisabled,
    selectStep1,
    selectStepOption,
    goNext,
  } = useTrackingFlow(id);

  if (isLoading) {
    return <PageLoading className="bg-gray-100" />;
  }

  if (!response?.data) return null;

  return (
    <div className="relative flex-1 min-h-dvh w-full overflow-hidden flex flex-col py-5">
      {step > 0 && <TrackingStepper currentStep={step} totalSteps={3} />}

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
