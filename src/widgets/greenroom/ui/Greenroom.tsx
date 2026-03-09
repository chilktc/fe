"use client";

import Image from "next/image";
import { GreenroomDetail } from "@/entities/greenroom/model/types";
import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

interface GreenroomProps {
  data: GreenroomDetail;
}

export function Greenroom({ data }: GreenroomProps) {
  const router = useRouter();

  return (
    // TODO 높이가 높을 때 빈 화면 어떻게 처리할지
    <div className="flex-1 flex flex-col gap-8 py-6 px-4">
      <div className="flex-1 flex flex-col gap-10 items-center">
        {/* Header */}
        <div className="w-full">
          <h1 className="text-gray-900 text-heading-3">오늘의 마음 주파수</h1>
          <p className="text-gray-800 text-body-6">
            마음의 문을 열어주셔서 감사해요
            <br />
            나누는 것만으로도 무게는 가벼워집니다
          </p>
        </div>

        {/* 페르소나별 이미지 */}
        <div className="relative aspect-square w-[223px] h-[223px] rounded-[32px] overflow-hidden shadow-[0_0_30px_10px_rgba(153,103,146,0.3)]">
          <Image
            src={data.imageUrl}
            alt="Greenroom"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* AI 요약 */}
        <div className="bg-gray-200 rounded-[10px] py-5 px-4 border border-gray-400 flex flex-col gap-2">
          <div>
            <div className="w-[16px] h-[3px] bg-primary-400 rounded-full" />
            <h3 className="text-gray-900 text-heading-5">{data.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.keywords.map((tag) => (
              <span key={tag} className="text-primary-400 text-label-2">
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-gray-800 text-body-6 whitespace-pre-wrap">
            {data.description}
          </p>
        </div>
      </div>

      <Button
        className="w-full h-14 text-button-1"
        onClick={() => router.push("/app")}
      >
        다음
      </Button>
    </div>
  );
}
