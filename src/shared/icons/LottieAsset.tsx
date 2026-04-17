import { useEffect, useState } from "react";
import type { CSSProperties, ComponentType } from "react";

type LottieComponentProps = {
  animationData: object;
  autoplay?: boolean;
  className?: string;
  loop?: boolean;
  style?: CSSProperties;
};

type LottieAssetProps = {
  src: string;
  className?: string;
  style?: CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
};

export function LottieAsset({
  src,
  className,
  style,
  loop = true,
  autoplay = true,
}: LottieAssetProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [LottieComponent, setLottieComponent] =
    useState<ComponentType<LottieComponentProps> | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAnimation() {
      const response = await fetch(src, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(`Failed to load lottie asset: ${src}`);
      }

      const data = (await response.json()) as object;
      setAnimationData(data);
    }

    loadAnimation().catch((error: unknown) => {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, [src]);

  useEffect(() => {
    let cancelled = false;

    async function loadLottieComponent() {
      const module = await import("lottie-react");

      if (!cancelled) {
        setLottieComponent(() => module.default as ComponentType<LottieComponentProps>);
      }
    }

    loadLottieComponent().catch((error: unknown) => {
      console.error(error);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!animationData || !LottieComponent) {
    return <div aria-hidden className={className} style={style} />;
  }

  return (
    <LottieComponent
      animationData={animationData}
      autoplay={autoplay}
      className={className}
      loop={loop}
      style={style}
    />
  );
}
