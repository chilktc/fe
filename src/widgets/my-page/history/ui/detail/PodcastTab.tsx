import { useState } from "react";
import { HistoryPodcastDetail } from "@/entities/history/model/types";
import { DownloadIcon } from "@/shared/icons";
import { Modal } from "@/shared/ui";
import Image from "@/shared/ui/Image";

interface PodcastTabProps {
  podcast: HistoryPodcastDetail;
}

export function PodcastTab({ podcast }: PodcastTabProps) {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const formattedDate = new Date(podcast.createdAt).toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    },
  );
  const hasImage = Boolean(podcast.imageUrl?.trim());

  const handleOpenDownloadModal = () => {
    if (!hasImage) return;
    setIsDownloadModalOpen(true);
  };

  const handleDownloadImage = async () => {
    if (!podcast.imageUrl) return;

    try {
      setIsDownloading(true);

      const response = await fetch(podcast.imageUrl);
      if (!response.ok) {
        throw new Error("이미지 다운로드에 실패했습니다.");
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const extension = blob.type.split("/")[1] || "png";

      anchor.href = objectUrl;
      anchor.download = `podcast-image-${podcast.id}.${extension}`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      window.URL.revokeObjectURL(objectUrl);
      setIsDownloadModalOpen(false);
    } catch (error) {
      console.error(error);
      window.alert("이미지를 저장하지 못했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 pt-4 pb-8">
      {hasImage && (
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-200 shadow-lg border border-gray-300">
          <Image
            src={podcast.imageUrl}
            alt="팟캐스트 이미지"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-label-3 text-gray-700">{formattedDate}</p>
        </div>
        {hasImage && (
          <button
            type="button"
            onClick={handleOpenDownloadModal}
            className="shrink-0 cursor-pointer w-7.5 aspect-square rounded-full border border-gray-400/50 bg-gray-200 flex justify-center items-center"
            aria-label="이미지 다운로드"
          >
            <DownloadIcon />
          </button>
        )}
      </div>

      <div className="space-y-5">
        <p className="text-body-6 text-gray-800 whitespace-pre-wrap">
          {podcast.text}
        </p>
      </div>

      <Modal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onSubmit={handleDownloadImage}
        isSubmitLoading={isDownloading}
        submitLabel="저장"
        cancelLabel="취소"
      >
        <div className="text-center py-4">
          <p className="text-heading-6 text-gray-900 font-bold mb-2">
            이미지 저장
          </p>
          <p className="text-label-2 text-gray-700">
            이미지를 저장하시겠습니까?
          </p>
        </div>
      </Modal>
    </div>
  );
}
