export function PodcastChoiceItemSkeleton() {
  return (
    <div className="w-full bg-gray-200 rounded-[10px] border border-gray-400 grid grid-rows-2 overflow-hidden">
      <div className="relative w-full h-[132px] skeletonUI" />
      <div>
        <div className="py-5 px-4 space-y-[5px]">
          <div className="w-full h-[22px] rounded-md skeletonUI" />
          <div className="w-full h-[26px] rounded-md skeletonUI" />
          <div className="w-full h-[36px] rounded-md skeletonUI" />
        </div>
      </div>
    </div>
  );
}
