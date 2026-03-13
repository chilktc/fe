"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";

export default function TrackingFailPage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh flex flex-col px-4 py-5">
      <div className="flex-1 flex flex-col space-y-3 py-10">
        <h1 className="text-gray-900 text-heading-3">
          고민 상태 기록을 완료했습니다
        </h1>
        <p className="text-gray-800 text-body-7">
          다음 기록은 일주일 뒤에 예정되어 있어요
        </p>
      </div>

      <Button className="w-full" onClick={() => router.push("/")}>
        홈으로 이동하기
      </Button>
    </div>
  );
}
