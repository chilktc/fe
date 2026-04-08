import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTrackingData } from "@/features/tracking";
import { WarningIcon } from "@/shared/icons";
import { useAppRouter } from "@/shared/lib/router";
import { Button, Chip, Modal, PageLoading } from "@/shared/ui";
import Image from "@/shared/ui/Image";

export function TrackingCompletePage() {
  const { id = "" } = useParams<{ id: string }>();
  const router = useAppRouter();
  const { data: response, isLoading } = useTrackingData(id);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <PageLoading />;
  }

  const data = response?.data;
  if (!data) {
    return null;
  }

  return (
    <div className="min-h-dvh flex flex-col px-4 py-10 space-y-10">
      <div className="flex-1 flex flex-col space-y-2">
        <h1 className="text-900 text-heading-3">다시 한 번 해결을 축하드립니다!</h1>
        <p className="text-gray-800 text-body-7">
          익명으로 사연을 공유해 다른 사용자에게 큰 도움이 되어주세요
        </p>

        <div className="w-full mt-10">
          <div className="bg-gray-200 rounded-[10px] overflow-hidden border border-gray-400 flex flex-col">
            <div className="relative h-[180px] w-full">
              <Image src={data.imageUrl} alt={data.title} fill className="object-cover" />
            </div>
            <div className="p-5 flex flex-col items-start space-y-3">
              <div className="w-full flex justify-between items-center">
                <span className="text-gray-800 text-caption-1">{data.date}</span>
                <div className="flex gap-1.5">
                  {data.type.map((type) => (
                    <Chip key={type} selected>
                      {type}
                    </Chip>
                  ))}
                </div>
              </div>
              <h2 className="text-gray-900 text-heading-6 text-left">{data.title}</h2>
              <p className={!isDetailView ? "text-gray-800 text-body-5 text-left line-clamp-5" : "text-gray-800 text-body-5 text-left"}>
                {data.description}
              </p>
              <button
                onClick={() => setIsDetailView((prev) => !prev)}
                className="self-end text-gray-700 text-caption-2 hover:text-gray-400 transition-colors"
              >
                {isDetailView ? "간략히 보기" : "자세히 보기"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="w-full h-14 bg-primary-400 text-gray-950 text-button-1 rounded-[12px] mt-auto"
        onClick={() => setIsModalOpen(true)}
      >
        마무리하기
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => router.push("/")}
        submitLabel="공유하기"
        cancelLabel="아니요"
      >
        <div className="flex flex-col items-center gap-4">
          <WarningIcon />
          <div className="space-y-1">
            <h3 className="text-heading-5 text-gray-900 text-center">공유하시겠어요?</h3>
            <p className="text-body-6 text-gray-800 text-center">
              익명으로 공유된 사연은 다른 사용자에게 큰 도움이 됩니다. 개인 정보는 절대 공개되지 않아요.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
