import { useState } from "react";
import { useSubmitTracking } from "@/features/tracking";
import { useAppRouter } from "@/shared/lib/router";
import { TRACKING_STEPS } from "@/entities/tracking/model/constants";

type TrackingPath = "solved" | "not-solved";

interface TrackingSelections {
  step1: TrackingPath | null;
  step2: string | null;
  step3: string | null;
}

export function useTrackingFlow(id: string) {
  const router = useAppRouter();
  const { mutateAsync: submitTracking, isPending: isSubmitting } =
    useSubmitTracking();

  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<TrackingSelections>({
    step1: null,
    step2: null,
    step3: null,
  });

  const isNextDisabled =
    (step === 1 && !selections.step1) ||
    (step === 2 && !selections.step2) ||
    (step === 3 && !selections.step3);

  const currentPath = selections.step1;
  const stepData =
    currentPath && step > 1
      ? TRACKING_STEPS[currentPath][`step${step as 2 | 3}`]
      : null;

  const selectStep1 = (value: TrackingPath) => {
    setSelections((prev) => ({
      ...prev,
      step1: value,
    }));
  };

  const selectStepOption = (value: string) => {
    setSelections((prev) => ({
      ...prev,
      [step === 2 ? "step2" : "step3"]: value,
    }));
  };

  const goNext = async () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }

    if (!selections.step1 || !selections.step2 || !selections.step3) {
      return;
    }

    try {
      await submitTracking({
        id,
        step1: selections.step1,
        step2: selections.step2,
        step3: selections.step3,
      });

      router.push(
        selections.step1 === "solved"
          ? `/tracking/complete/${id}`
          : `/tracking/fail/${id}`,
      );
    } catch (error) {
      console.error("Failed to submit tracking:", error);
    }
  };

  return {
    step,
    selections,
    stepData,
    isSubmitting,
    isNextDisabled,
    selectStep1,
    selectStepOption,
    goNext,
  };
}
