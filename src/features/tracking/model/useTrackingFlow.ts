import { useState } from "react";
import { useSubmitTracking } from "@/features/tracking";
import {
  RESOLVED_HELP_TYPE_MAP,
  RESOLVED_STATE_TYPE_MAP,
  TRACKING_STEPS,
  UNRESOLVED_BLOCKER_TYPE_MAP,
  UNRESOLVED_NEED_TYPE_MAP,
} from "@/entities/tracking/model/constants";

type TrackingPath = "solved" | "not-solved";

interface TrackingSelections {
  step1: TrackingPath | null;
  step2: string | null;
  step3: string | null;
}

function getMappedValue<T extends string>(
  map: Record<string, T>,
  key: string,
): T {
  return map[key];
}

export function useTrackingFlow(id: string) {
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
  const resultData =
    currentPath && step === 4 ? TRACKING_STEPS[currentPath].step4 : null;

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

  const buildSubmitPayload = () => {
    if (!selections.step1 || !selections.step2 || !selections.step3) {
      return null;
    }

    if (selections.step1 === "solved") {
      return {
        ticketId: id,
        status: "RESOLVED" as const,
        resolvedHelpType: getMappedValue(
          RESOLVED_HELP_TYPE_MAP,
          selections.step2,
        ),
        resolvedStateType: getMappedValue(
          RESOLVED_STATE_TYPE_MAP,
          selections.step3,
        ),
        note: null,
      };
    }

    return {
      ticketId: id,
      status: "UNRESOLVED" as const,
      unresolvedBlockerType: getMappedValue(
        UNRESOLVED_BLOCKER_TYPE_MAP,
        selections.step2,
      ),
      unresolvedNeedType: getMappedValue(
        UNRESOLVED_NEED_TYPE_MAP,
        selections.step3,
      ),
      note: null,
    };
  };

  const goNext = async () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }

    const submitPayload = buildSubmitPayload();

    if (!submitPayload) {
      return;
    }

    try {
      await submitTracking(submitPayload);
      setStep(4);
    } catch (error) {
      console.error("Failed to submit tracking:", error);
    }
  };

  return {
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
  };
}
