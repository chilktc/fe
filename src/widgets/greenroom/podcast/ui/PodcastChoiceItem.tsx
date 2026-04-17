import Image from "@/shared/ui/Image";
import { PodcastChoiceDetail } from "@/entities/greenroom/model/types";
import { Chip } from "@/shared/ui";

interface PodcastChoiceItemProps {
  data: PodcastChoiceDetail;
  isSelected?: boolean;
  isDimmed?: boolean;
  onSelect?: () => void;
}

export function PodcastChoiceItem({
  data,
  isSelected,
  isDimmed,
  onSelect,
}: PodcastChoiceItemProps) {
  return (
    <div
      onClick={onSelect}
      className={`bg-gray-200 rounded-[10px] grid grid-rows-2 overflow-hidden cursor-pointer transition-all box-border ${
        isSelected ? "ring-primary-400 ring-2" : "ring-gray-400 ring-1"
      } ${isDimmed ? "opacity-50" : "opacity-100"}`}
    >
      <div className="relative w-full">
        <Image
          src={data.imageUrl}
          alt="Podcast Image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className={`${isSelected && "bg-primary-200"}`}>
        <div className="py-5 px-4 space-y-[5px]">
          <div className="flex flex-wrap gap-2">
            {data.type.map((type, index) => (
              <Chip key={`${type}-${index}`} selected={isSelected}>
                {type}
              </Chip>
            ))}
          </div>
          <h3 className="text-gray-900 text-heading-6">{data.title}</h3>
          <p className="text-gray-800 text-label-1 whitespace-pre-wrap">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
