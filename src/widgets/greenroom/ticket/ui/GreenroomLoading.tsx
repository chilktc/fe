import { LottieAsset } from "@/shared/icons";
import bubbleDataUrl from "@/shared/assets/soap-bubble.lottie.json?url";

export function GreenroomLoading() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500">
      <LottieAsset
        autoplay
        loop
        src={bubbleDataUrl}
        style={{ width: 220, height: 220 }}
      />

      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-body-6 text-gray-800">잠시만 기다려주세요</p>
        <h3 className="text-heading-3 text-gray-900">
          당신만을 위한 주파수를
          <br />
          맞추는 중이에요...
        </h3>
      </div>
    </div>
  );
}
