"use client";

import { useState } from "react";
import { TrackingDetail } from "@/entities/tracking/model/types";
import { WarningIcon } from "@/shared/icons";
import { Button, Chip, Modal } from "@/shared/ui";
import Image from "@/shared/ui/Image";

interface ResultStepProps {
  data: TrackingDetail;
  title: string;
  description: string;
  buttonLabel: string;
  isShareFlow: boolean;
  onAction: () => void;
}

export function ResultStep({
  data,
  title,
  description,
  buttonLabel,
  isShareFlow,
  onAction,
}: ResultStepProps) {
  const [isDetailView, setIsDetailView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate = new Date(data.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-1 flex-col px-4 py-5">
      <div className="flex flex-1 flex-col space-y-2">
        <h1 className="text-gray-900 text-heading-3">{title}</h1>
        <p className="text-gray-800 text-body-7">{description}</p>

        <div className="w-full mt-10">
          <div className="bg-gray-200 rounded-[10px] overflow-hidden border border-gray-400 flex flex-col">
            <div className="relative h-[180px] w-full">
              <Image
                src={data.imageUrl}
                alt={data.description}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 flex flex-col items-start space-y-3">
              <div className="w-full flex justify-between items-center gap-3">
                <span className="text-gray-800 text-caption-1">
                  {formattedDate}
                </span>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {data.keywords.map((keyword) => (
                    <Chip key={keyword} selected>
                      {keyword}
                    </Chip>
                  ))}
                </div>
              </div>

              <p
                className={
                  !isDetailView
                    ? "text-gray-800 text-body-5 text-left whitespace-pre-wrap line-clamp-5"
                    : "text-gray-800 text-body-5 text-left whitespace-pre-wrap"
                }
              >
                {data.description}
              </p>

              {isShareFlow && (
                <button
                  onClick={() => setIsDetailView((prev) => !prev)}
                  className="self-end text-gray-700 text-caption-2 hover:text-gray-400 transition-colors"
                >
                  {isDetailView ? "간략히 보기" : "자세히 보기"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Button
        className="w-full h-14 bg-primary-400 text-gray-950 text-button-1 rounded-[12px] mt-auto"
        onClick={() => {
          if (isShareFlow) {
            setIsModalOpen(true);
            return;
          }

          onAction();
        }}
      >
        {buttonLabel}
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={onAction}
        onSubmit={onAction}
        submitLabel="공유하기"
        cancelLabel="아니요"
      >
        <div className="flex flex-col items-center gap-4">
          <WarningIcon />
          <div className="space-y-1">
            <h3 className="text-heading-5 text-gray-900 text-center">
              공유하시겠어요?
            </h3>
            <p className="text-body-6 text-gray-800 text-center">
              익명으로 공유된 사연은 다른 사용자에게 큰 도움이 됩니다. 개인
              정보는 절대 공개되지 않아요.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
