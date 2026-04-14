import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { useGreenroomSessionStore } from "@/entities/greenroom/model/store";

interface StorySelectionRequest {
  keywords: string[];
  title: string;
  description: string;
}

interface StorySelectionResponse {
  code: string;
  message: string;
}

export function useStorySelection() {
  const sessionId = useGreenroomSessionStore((state) => state.sessionId);

  return useMutation({
    mutationFn: async (body: StorySelectionRequest) => {
      return api.post<StorySelectionResponse, StorySelectionRequest>(
        "/greenroom/ai/tickets/story-selection",
        body,
        {
          headers: {
            "X-AI-Session-Id": sessionId,
          },
        },
      );
    },
  });
}
