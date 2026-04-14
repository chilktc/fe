import { useCallback, useEffect, useRef, useState } from "react";
import { GreenroomResponse } from "@/entities/greenroom/model/types";
import { useGreenroomSessionStore } from "@/entities/greenroom/model/store";
import { api } from "@/shared/api/base";

const MAX_POLL_ATTEMPTS = 20;
const POLL_INTERVAL = 3000;

const wait = (ms: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

export function useGreenroom() {
  const sessionId = useGreenroomSessionStore((state) => state.sessionId);
  const storedMindFrequency = useGreenroomSessionStore(
    (state) => state.mindFrequency,
  );
  const setMindFrequency = useGreenroomSessionStore(
    (state) => state.setMindFrequency,
  );

  const [data, setData] = useState<GreenroomResponse | null>(
    storedMindFrequency
      ? {
          code: "ok",
          message: "성공",
          data: storedMindFrequency,
        }
      : null,
  );
  const [isLoading, setIsLoading] = useState(!storedMindFrequency);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(storedMindFrequency ? 1 : 0);
  const requestIdRef = useRef(0);

  const fetchMindFrequencies = useCallback(async () => {
    if (!sessionId) {
      setData(null);
      setIsLoading(false);
      setIsFetching(false);
      setIsError(true);
      setErrorMessage("AI 세션 정보를 찾을 수 없어요.");
      return;
    }

    const requestId = ++requestIdRef.current;

    setData(null);
    setIsError(false);
    setErrorMessage(null);
    setIsLoading(true);
    setIsFetching(true);
    setAttemptCount(0);
    setMindFrequency(null);

    let lastErrorMessage: string | null = null;

    for (let attempt = 1; attempt <= MAX_POLL_ATTEMPTS; attempt += 1) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      setAttemptCount(attempt);

      try {
        const response = await api.get<GreenroomResponse>(
          "/greenroom/ai/tickets/mind-frequencies",
          {
            headers: {
              "X-AI-Session-Id": sessionId,
            },
          },
        );

        if (requestId !== requestIdRef.current) {
          return;
        }

        if (response.data) {
          setData(response);
          setMindFrequency(response.data);
          setIsLoading(false);
          setIsFetching(false);
          setIsError(false);
          setErrorMessage(null);
          return;
        }
      } catch (error) {
        if (requestId !== requestIdRef.current) {
          return;
        }
        lastErrorMessage =
          error instanceof Error
            ? error.message
            : "마음 주파수를 불러오지 못했어요.";
      }

      if (attempt < MAX_POLL_ATTEMPTS) {
        await wait(POLL_INTERVAL);
      }
    }

    if (requestId !== requestIdRef.current) {
      return;
    }

    setData(null);
    setIsLoading(false);
    setIsFetching(false);
    setIsError(true);
    setErrorMessage(
      lastErrorMessage ?? "응답을 준비하는 데 시간이 오래 걸리고 있어요.",
    );
  }, [sessionId, setMindFrequency]);

  useEffect(() => {
    if (storedMindFrequency && sessionId) {
      setData({
        code: "ok",
        message: "성공",
        data: storedMindFrequency,
      });
      setIsLoading(false);
      setIsFetching(false);
      setIsError(false);
      setErrorMessage(null);
      return;
    }

    void fetchMindFrequencies();

    return () => {
      requestIdRef.current += 1;
    };
  }, [fetchMindFrequencies, sessionId, storedMindFrequency]);

  return {
    data,
    isLoading,
    isFetching,
    isError,
    errorMessage,
    attemptCount,
    refetch: fetchMindFrequencies,
  };
}
