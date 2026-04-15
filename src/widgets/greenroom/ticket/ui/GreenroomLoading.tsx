import { useEffect, useState } from "react";
import { LottieAsset } from "@/shared/icons";
import bubbleDataUrl from "@/shared/assets/soap-bubble.lottie.json?url";

const LOADING_MESSAGES = [
  {
    eyebrow: "잠시만 기다려주세요",
    title: ["당신만을 위한 주파수를", "맞추는 중이에요..."],
  },
  {
    eyebrow: "조금만 더 머물러 주세요",
    title: ["마음의 결을 읽고", "이야기를 엮고 있어요..."],
  },
  {
    eyebrow: "거의 다 준비됐어요",
    title: ["당신에게 맞는 흐름으로", "팟캐스트를 다듬는 중이에요..."],
  },
];

interface GreenroomLoadingProps {
  variant?: "fullscreen" | "embedded";
}

export function GreenroomLoading({
  variant = "fullscreen",
}: GreenroomLoadingProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isMessageVisible, setIsMessageVisible] = useState(true);

  useEffect(() => {
    const displayDuration = 10000;
    const fadeDuration = 500;
    let fadeTimer: number | undefined;

    const timer = window.setInterval(() => {
      setIsMessageVisible(false);

      fadeTimer = window.setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        setIsMessageVisible(true);
      }, fadeDuration);
    }, displayDuration);

    return () => {
      window.clearInterval(timer);
      if (fadeTimer) {
        window.clearTimeout(fadeTimer);
      }
    };
  }, []);

  const currentMessage = LOADING_MESSAGES[messageIndex];
  const isEmbedded = variant === "embedded";

  return (
    <div
      className={`flex flex-col items-center justify-center animate-in fade-in duration-500 ${
        isEmbedded ? "w-full gap-5 rounded-2xl bg-gray-200 px-5 py-8" : "h-dvh gap-8"
      }`}
    >
      <LottieAsset
        autoplay
        loop
        src={bubbleDataUrl}
        style={{
          width: isEmbedded ? 140 : 220,
          height: isEmbedded ? 140 : 220,
        }}
      />

      <div className="flex flex-col items-center gap-3 text-center">
        <p
          className={`text-body-6 text-gray-800 transition-all duration-500 ${
            isMessageVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-0"
          }`}
        >
          {currentMessage.eyebrow}
        </p>
        <h3
          className={`text-gray-900 transition-all duration-500 ${
            isMessageVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-0"
          } ${
            isEmbedded ? "text-heading-4" : "text-heading-3"
          }`}
        >
          {currentMessage.title[0]}
          <br />
          {currentMessage.title[1]}
        </h3>
      </div>
    </div>
  );
}
