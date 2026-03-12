import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMockHistory } from "./use-history";

export function useDeleteHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // 실제 API 연동 시
      // return await api.delete(`/api/history/${id}`);

      // 목 데이터 (개발용)
      await new Promise((resolve) => setTimeout(resolve, 500));
      deleteMockHistory(id);
      return { code: "SUCCESS", message: "삭제되었습니다." };
    },
    onSuccess: () => {
      // 삭제 성공 시 캐시 무효화하여 리스트 갱신
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}
