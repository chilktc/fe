import { Chip } from "@/shared/ui";
import { DownloadIcon } from "@/shared/icons";
import Image from "@/shared/ui/Image";

interface PodcastTabProps {
  history: {
    title: string;
    imageUrl?: string;
    type: string[];
    podcast: {
      story: string;
    };
  };
}

export function PodcastTab({ history }: PodcastTabProps) {
  return (
    <div className="flex flex-col gap-5 pt-4 pb-8">
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-200 shadow-lg border border-gray-300">
        {history.imageUrl && (
          <Image
            src={history.imageUrl}
            alt={history.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex gap-1">
            {history.type.map((t) => (
              <Chip key={t} selected>
                {t}
              </Chip>
            ))}
          </div>
          <h2 className="text-heading-6 text-gray-950 font-bold leading-tight">
            {history.title}
          </h2>
        </div>
        <button className="shrink-0 cursor-pointer w-7.5 aspect-square rounded-full border border-gray-400/50 bg-gray-200 flex justify-center items-center">
          <DownloadIcon />
        </button>
      </div>

      <div className="space-y-5">
        <p className="text-body-6 text-gray-800 whitespace-pre-wrap">
          {history.podcast.story}
        </p>
      </div>
    </div>
  );
}
