import { useState, useCallback } from "react";
import { useAppRouter } from "@/shared/lib/router";
import { useSessionStore } from "@/entities/session/model/store";
import { useCreateTicket } from "./use-create-ticket";
import { ChatMessage } from "@/entities/ticket/model/types";
import { QUESTIONS, GUIDES } from "@/entities/ticket/model/constants";

export function useTicketIssuance() {
  const router = useAppRouter();
  const user = useSessionStore((state) => state.user);
  const nickname = user?.nickname || "ㅇㅇㅇ";

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

  const currentPlaceholder = "당신의 생각을 적어주세요";

  const isComplete = step >= QUESTIONS.length;

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

      // 성공 시 /greenroom/{id}로 이동
      if (response?.data?.id) {
        router.push(`/greenroom/${response.data.id}`);
      }
    } catch (error) {
      console.error("Failed to submit ticket", error);
    }
  }, [answers, isComplete, mutateAsync, router]);

  return {
    step,
    history,
    handleSendMessage,
    submitTicket,
    isComplete,
    currentPlaceholder,
    isSubmitting,
    isWaiting,
  };
}
