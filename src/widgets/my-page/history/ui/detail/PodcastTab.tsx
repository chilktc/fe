import { HistoryPodcastDetail } from "@/entities/history/model/types";
import { DownloadIcon } from "@/shared/icons";
import Image from "@/shared/ui/Image";

interface PodcastTabProps {
  podcast: HistoryPodcastDetail;
}

export function PodcastTab({ podcast }: PodcastTabProps) {
  const formattedDate = new Date(podcast.createdAt).toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    },
  );

  return (
    <div className="flex flex-col gap-5 pt-4 pb-8">
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-200 shadow-lg border border-gray-300">
        {podcast.imageUrl && (
          <Image
            src={podcast.imageUrl}
            alt="팟캐스트 이미지"
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-label-3 text-gray-700">{formattedDate}</p>
        </div>
        <button className="shrink-0 cursor-pointer w-7.5 aspect-square rounded-full border border-gray-400/50 bg-gray-200 flex justify-center items-center">
          <DownloadIcon />
        </button>
      </div>

      <div className="space-y-5">
        <p className="text-body-6 text-gray-800 whitespace-pre-wrap">
          {podcast.text}
        </p>
      </div>
    </div>
  );
}
