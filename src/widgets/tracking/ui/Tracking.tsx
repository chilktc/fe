"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTrackingData } from "@/entities/tracking/api/use-tracking-data";
import { useSubmitTracking } from "@/entities/tracking/api/use-submit-tracking";
import { TRACKING_STEPS } from "@/entities/tracking/model/constants";
import { Button } from "@/shared/ui";
import { TrackingStepper } from "./TrackingStepper";
import { Step } from "./Step";
import { SelectionStep } from "./SelectionStep";

interface TrackingProps {
  id: string;
}

export function Tracking({ id }: TrackingProps) {
  const router = useRouter();
  const { data: response, isLoading } = useTrackingData(id);
  const { mutateAsync: submitTracking, isPending: isSubmitting } =
    useSubmitTracking();

  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<{
    step1: "solved" | "not-solved" | null;
    step2: string | null;
    step3: string | null;
  }>({
    step1: null,
    step2: null,
    step3: null,
  });

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  if (!response?.data) return null;

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (!selections.step1 || !selections.step2 || !selections.step3) return;

      try {
        await submitTracking({
          id,
          step1: selections.step1,
          step2: selections.step2,
          step3: selections.step3,
        });

        if (selections.step1 === "solved") {
          router.push(`/tracking/complete/${id}`);
        } else {
          router.push(`/tracking/fail/${id}`);
        }
      } catch (error) {
        console.error("Failed to submit tracking:", error);
      }
    }
  };

  const isButtonDisabled = () => {
    if (step === 1) return !selections.step1;
    if (step === 2) return !selections.step2;
    if (step === 3) return !selections.step3;
    return false;
  };

  const currentPath = selections.step1;
  const stepData =
    currentPath && step > 1
      ? TRACKING_STEPS[currentPath][`step${step as 2 | 3}`]
      : null;

  return (
    <div className="relative flex-1 min-h-dvh w-full overflow-hidden flex flex-col py-5">
      {step > 0 && <TrackingStepper currentStep={step} totalSteps={3} />}

      <main className="flex-1 flex flex-col overflow-hidden min-h-0 pt-2.5">
        {step === 1 && (
          <Step
            data={response.data}
            selection={selections.step1}
            onSelect={(v) =>
              setSelections({
                ...selections,
                step1: v as "solved" | "not-solved",
              })
            }
          />
        )}
        {step > 1 && stepData && (
          <SelectionStep
            title={stepData.title}
            options={stepData.options}
            selection={step === 2 ? selections.step2 : selections.step3}
            onSelect={(v) =>
              setSelections({
                ...selections,
                [step === 2 ? "step2" : "step3"]: v,
              })
            }
          />
        )}
      </main>

      <div className="px-4">
        <Button
          className={`w-full h-14 text-button-1 ${
            isButtonDisabled()
              ? "bg-gray-400 text-gray-800 opacity-100"
              : "bg-primary-400 text-gray-900"
          }`}
          onClick={handleNext}
          disabled={isButtonDisabled() || isSubmitting}
        >
          {isSubmitting ? "제출 중..." : "계속하기"}
        </Button>
      </div>
    </div>
  );
}
