import { useState, useCallback, useEffect, useRef } from "react";
import { useAppRouter } from "@/shared/lib/router";
import { useSessionStore } from "@/entities/session/model/store";
import { useGreenroomSessionStore } from "@/entities/greenroom/model/store";
import { useCreateTicket } from "./use-create-ticket";
import { ChatMessage } from "@/entities/ticket/model/types";
import { QUESTIONS, GUIDES } from "@/entities/ticket/model/constants";
import {
  buildTicketIssuanceHistory,
  clearTicketIssuanceDraft,
  readTicketIssuanceDraft,
  saveTicketIssuanceDraft,
} from "./draft-storage";

export function useTicketIssuance() {
  const router = useAppRouter();
  const user = useSessionStore((state) => state.user);
  const setSessionId = useGreenroomSessionStore((state) => state.setSessionId);
  const clearGreenroomSession = useGreenroomSessionStore(
    (state) => state.clearGreenroomSession,
  );
  const nickname = user?.nickname || "사용자" + "님";

  const { mutateAsync, isPending: isSubmitting } = useCreateTicket();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [history, setHistory] = useState<ChatMessage[]>([
    {
      type: "system",
      content: QUESTIONS[0],
      id: "q-0",
      guide: GUIDES[0],
    },
  ]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [shouldShowRestoreModal, setShouldShowRestoreModal] = useState(false);
  const hasCheckedDraftRef = useRef(false);

  const currentPlaceholder = "당신의 생각을 적어주세요";

  const isComplete = step >= QUESTIONS.length;

  const clearDraft = useCallback(() => {
    clearTicketIssuanceDraft();
    setShouldShowRestoreModal(false);
  }, []);

  const restoreDraft = useCallback(() => {
    const draft = readTicketIssuanceDraft();
    if (!draft) return;

    setStep(draft.answers.length);
    setAnswers(draft.answers);
    setHistory(buildTicketIssuanceHistory(draft.answers, nickname));
    setShouldShowRestoreModal(false);
  }, [nickname]);

  useEffect(() => {
    if (hasCheckedDraftRef.current) return;

    hasCheckedDraftRef.current = true;
    const draft = readTicketIssuanceDraft();

    if (draft) {
      setShouldShowRestoreModal(true);
    }
  }, []);

  useEffect(() => {
    saveTicketIssuanceDraft(answers);
  }, [answers]);

  const handleSendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || isComplete || isWaiting) return;

      // 유저 답변 추가
      const newAnswerId = `a-${step}`;
      setHistory((prev) => [
        ...prev,
        { type: "user", content, id: newAnswerId },
      ]);
      setAnswers((prev) => [...prev, content]);

      // 다음 단계로 이동
      const nextStep = step + 1;
      setStep(nextStep);

      // 다음 질문 추가
      if (nextStep < QUESTIONS.length) {
        setIsWaiting(true);
        const nextQuestion = QUESTIONS[nextStep].replace(
          "{nickname}",
          nickname,
        );
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            {
              type: "system",
              content: nextQuestion,
              id: `q-${nextStep}`,
              guide: GUIDES[nextStep],
            },
          ]);
          setIsWaiting(false);
        }, 500);
      }
    },
    [step, nickname, isComplete, isWaiting],
  );

  const submitTicket = useCallback(async () => {
    if (!isComplete) return;

    try {
      const response = await mutateAsync(answers);
      const sessionId = response.data.data?.sessionId;

      if (sessionId) {
        clearGreenroomSession();
        setSessionId(sessionId);
        router.push("/greenroom");
      }
    } catch (error) {
      console.error("Failed to submit ticket", error);
    }
  }, [
    answers,
    clearGreenroomSession,
    isComplete,
    mutateAsync,
    router,
    setSessionId,
  ]);

  return {
    step,
    history,
    handleSendMessage,
    submitTicket,
    isComplete,
    currentPlaceholder,
    isSubmitting,
    isWaiting,
    shouldShowRestoreModal,
    restoreDraft,
    clearDraft,
  };
}
