"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "@/shared/ui/Image";
import { PodcastDetail } from "@/entities/greenroom/model/types";
import { Button, Chip } from "@/shared/ui";
import { useAppRouter } from "@/shared/lib/router";

interface PodcastProps {
  data: PodcastDetail;
}

export function Podcast({ data }: PodcastProps) {
  const router = useAppRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const fragments = useMemo(() => {
    return data.story ? data.story.split("\n\n").filter(Boolean) : [];
  }, [data.story]);

  useEffect(() => {
    if (currentIndex < fragments.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, fragments.length]);

  const handleNext = () => {
    router.push(`/`);
  };

  const displayedFragments = fragments.slice(0, currentIndex + 1);
  const hasMore = currentIndex < fragments.length - 1;

  return (
    <div className="flex-1 flex flex-col py-6 px-4 min-h-full gap-[18px]">
      {/* Header Image */}
      <div className="shrink-0 relative w-full aspect-square flex flex-col justify-center items-center gap-5 px-4 py-6 rounded-[10px]">
        <div className="absolute top-0 left-0 w-full h-full rounded-[10px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
            style={{ backgroundImage: `url(${data.imageUrl})` }}
          />
        </div>
        <div className="relative z-10 aspect-square w-full max-w-34 rounded-full overflow-hidden">
          <Image
            src={data.imageUrl}
            alt="My Greenroom Image"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 w-full flex flex-col gap-1 justify-center items-center text-center">
          <div className="flex flex-wrap gap-2">
            {data.type.map((type) => (
              <Chip key={type} selected>
                {type}
              </Chip>
            ))}
          </div>
          <p className="text-heading-6 text-gray-200">{data.title}</p>
          <p className="text-body-6 text-gray-400 whitespace-pre-wrap wrap-break-word">
            {data.description}
          </p>
        </div>
      </div>

      {/* 팟캐스트 이야기 */}
      <div className="w-full flex-1 flex flex-col gap-4 text-body-6 text-gray-800 overflow-y-auto min-h-[150px] scrollbar-hide basis-0">
        {displayedFragments.map((fragment, index) => (
          <StoryFragment key={index} fragment={fragment} />
        ))}
        {hasMore && <StoryFragment fragment="b.l.o.o.m.i.n.g..." />}
      </div>

      <Button className="w-full h-14 text-button-1" onClick={handleNext}>
        감상 완료
      </Button>
    </div>
  );
}

function StoryFragment({ fragment }: { fragment: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // threshold를 0.9 정도로 두어 문단이 90% 이상 보일 때만 진하게 합니다.
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // 브라우저 뷰포트 기준
        threshold: 0.8,
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <p
      ref={elementRef}
      className={`whitespace-pre-wrap transition-colors duration-500 ${
        isVisible ? "text-gray-800" : "text-gray-400"
      }`}
    >
      {fragment}
    </p>
  );
}
