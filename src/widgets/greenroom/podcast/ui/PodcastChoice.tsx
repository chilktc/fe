"use client";

import { useMemo, useState } from "react";
import { Button } from "@/shared/ui";
import { useAppRouter } from "@/shared/lib/router";
import { PodcastChoiceItem } from "./PodcastChoiceItem";
import { PodcastChoiceItemSkeleton } from "./PodcastChoiceItemSkeleton";
import { PODCAST_CHOICES } from "@/entities/greenroom/model/constants";
import { PodcastChoiceDetail } from "@/entities/greenroom/model/types";
import { useGreenroomSessionStore } from "@/entities/greenroom/model/store";
import { useStorySelection } from "@/features/greenroom";

const PODCAST_CHOICE_COUNT = 2;

function pickRandomChoices(choices: PodcastChoiceDetail[]) {
  return [...choices]
    .sort(() => Math.random() - 0.5)
    .slice(0, PODCAST_CHOICE_COUNT);
}

export function PodcastChoice() {
  const router = useAppRouter();
  const mindFrequency = useGreenroomSessionStore((state) => state.mindFrequency);
  const setSelectedPodcastChoice = useGreenroomSessionStore(
    (state) => state.setSelectedPodcastChoice,
  );
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [choices] = useState(() => pickRandomChoices(PODCAST_CHOICES));
  const { mutateAsync, isPending } = useStorySelection();

  const selectedChoice = useMemo(
    () => choices.find((choice) => choice.title === selectedTitle) ?? null,
    [choices, selectedTitle],
  );

  const handleNext = async () => {
    if (!selectedChoice || !mindFrequency) return;

    await mutateAsync({
      keywords: mindFrequency.keywords,
      title: selectedChoice.title,
      description: selectedChoice.description,
    });

    setSelectedPodcastChoice(selectedChoice);
    router.push("/greenroom/podcast");
  };

  return (
    <div className="flex-1 flex flex-col gap-5 items-center py-6 px-4">
      <div className="w-full">
        <h1 className="text-gray-900 text-heading-3">오늘의 팟캐스트</h1>
        <p className="text-gray-800 text-body-6">
          지금 당신의 마음이 가장 머물고 싶은 이야기를 골라보세요!
        </p>
      </div>
      <div className="w-full space-y-[10px] flex-1">
        {mindFrequency ? (
          choices.map((choice, index) => (
            <PodcastChoiceItem
              key={`${choice.title}-${index}`}
              data={choice}
              isSelected={selectedTitle === choice.title}
              isDimmed={
                selectedTitle !== null && selectedTitle !== choice.title
              }
              onSelect={() => setSelectedTitle(choice.title)}
            />
          ))
        ) : (
          Array.from({ length: 2 }).map((_, i) => (
            <PodcastChoiceItemSkeleton key={i} />
          ))
        )}
      </div>

      <Button
        className="w-full h-14 text-button-1"
        onClick={() => {
          void handleNext();
        }}
        disabled={selectedTitle === null || !mindFrequency}
        isLoading={isPending}
      >
        팟캐스트 입장하기
      </Button>
    </div>
  );
}
