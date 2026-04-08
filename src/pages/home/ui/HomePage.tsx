import { useAppRouter } from "@/shared/lib/router";
import { Button } from "@/shared/ui";
import { useSessionStore } from "@/entities/session/model/store";
import { Layout } from "@/widgets/layout";

export function HomePage() {
  const user = useSessionStore((state) => state.user);
  const router = useAppRouter();

  if (!user) {
    return null;
  }

  return (
    <Layout user={user}>
      <div className="flex-1 flex flex-col items-center justify-between pb-5">
        <div className="flex-1 w-full flex flex-col justify-center">
          <h1 className="text-body-1 text-gray-800">
            {user.nickname}님, 안녕하세요
            <br />
            <span className="text-heading-4 text-gray-900">
              어떤 고민을 하고 계신가요?
            </span>
          </h1>
        </div>
        <Button className="w-full" onClick={() => router.push("/issuance")}>
          고민 나누기
        </Button>
      </div>
    </Layout>
  );
}
