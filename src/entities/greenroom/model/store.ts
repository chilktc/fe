import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  GreenroomDetail,
  PodcastChoiceDetail,
} from "@/entities/greenroom/model/types";

interface GreenroomSessionState {
  sessionId: string | null;
  mindFrequency: GreenroomDetail | null;
  selectedPodcastChoice: PodcastChoiceDetail | null;
  setSessionId: (sessionId: string | null) => void;
  setMindFrequency: (mindFrequency: GreenroomDetail | null) => void;
  setSelectedPodcastChoice: (
    selectedPodcastChoice: PodcastChoiceDetail | null,
  ) => void;
  clearGreenroomSession: () => void;
}

export const useGreenroomSessionStore = create<GreenroomSessionState>()(
  persist(
    (set) => ({
      sessionId: null,
      mindFrequency: null,
      selectedPodcastChoice: null,
      setSessionId: (sessionId) => set({ sessionId }),
      setMindFrequency: (mindFrequency) => set({ mindFrequency }),
      setSelectedPodcastChoice: (selectedPodcastChoice) =>
        set({ selectedPodcastChoice }),
      clearGreenroomSession: () =>
        set({
          sessionId: null,
          mindFrequency: null,
          selectedPodcastChoice: null,
        }),
    }),
    {
      name: "greenroom-session",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
