"use client";

import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { PodcastChoiceItem } from "./PodcastChoiceItem";
import { usePodcastChoice } from "@/entities/greenroom/api/use-podcast-choice";
import { PodcastChoiceItemSkeleton } from "./PodcastChoiceItemSkeleton";
import { useState } from "react";

interface PodcastChoiceProps {
  id: string;
}

export function PodcastChoice({ id }: PodcastChoiceProps) {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading } = usePodcastChoice(id);

  const handleNext = () => {
    if (!selectedId) return;
    router.push(`/greenroom/${id}/podcast`);
  };

  return (
    <div className="flex-1 flex flex-col gap-5 items-center py-6 px-4">
      {/* Header */}
      <div className="w-full">
        <h1 className="text-gray-900 text-heading-3">오늘의 팟캐스트</h1>
        <p className="text-gray-800 text-body-6">
          지금 당신의 마음이 가장 머물고 싶은 이야기를 골라보세요!
        </p>
      </div>
      <div className="w-full space-y-[10px] flex-1">
        {!isLoading ? (
          data ? (
            data.data.map((d) => (
              <PodcastChoiceItem
                key={d.id}
                data={d}
                isSelected={selectedId === d.id}
                isDimmed={selectedId !== null && selectedId !== d.id}
                onSelect={() => setSelectedId(d.id)}
              />
            ))
          ) : (
            // TODO data가 없을 경우 fallback
            <></>
          )
        ) : (
          Array.from({ length: 2 }).map((_, i) => (
            <PodcastChoiceItemSkeleton key={i} />
          ))
        )}
      </div>

      <Button
        className="w-full h-14 text-button-1"
        onClick={handleNext}
        disabled={selectedId === null}
      >
        팟캐스트 입장하기
      </Button>
    </div>
  );
}
