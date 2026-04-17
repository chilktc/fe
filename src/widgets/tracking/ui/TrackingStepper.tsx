"use client";

interface TrackingStepperProps {
  currentStep: number;
  totalSteps: number;
}

export function TrackingStepper({
  currentStep,
  totalSteps,
}: TrackingStepperProps) {
  return (
    <div className="flex w-full items-center px-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const isLast = stepNumber === totalSteps;

        return (
          <div key={stepNumber} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`flex h-5 w-5 text-gray-950 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? "border-primary-400 bg-primary-400"
                  : "border-primary-400 bg-transparent"
              }`}
            >
              <span className="text-caption-2">{stepNumber}</span>
            </div>

            {/* Dashed Line */}
            {!isLast && (
              <div className="flex w-6 items-center justify-center px-1">
                <div className="h-0 w-full border-t-2 border-dashed border-primary-400" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
