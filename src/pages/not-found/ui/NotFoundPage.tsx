import { useAppRouter } from "@/shared/lib/router";
import { Button } from "@/shared/ui";

export function NotFoundPage() {
  const router = useAppRouter();

  return (
    <main className="flex-1 min-h-dvh flex items-center justify-center px-5 py-6">
      <section className="w-full max-w-[440px] rounded-[24px] border border-gray-400 bg-gray-100 px-6 py-8 shadow-2xl">
        <div className="inline-flex items-center rounded-full border border-primary-300/30 bg-primary-200/40 px-3 py-1 text-label-2 text-primary-600">
          404 NOT FOUND
        </div>
        <h1 className="mt-4 text-heading-3 text-gray-900">
          페이지를 찾을 수 없습니다.
        </h1>
        <p className="mt-3 text-body-4 text-gray-800">
          입력한 주소가 잘못되었거나, 페이지가 이동 또는 삭제되었을 수 있습니다.
          홈으로 돌아가 다시 시작해 주세요.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button
            className="flex-1 border border-gray-400 text-gray-900"
            variant="gray"
            onClick={() => router.back()}
          >
            이전 페이지
          </Button>
          <Button className="flex-1" onClick={() => router.push("/")}>
            홈으로 이동
          </Button>
        </div>
      </section>
    </main>
  );
}
