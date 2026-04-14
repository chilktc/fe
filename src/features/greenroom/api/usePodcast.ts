import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/shared/api/base";
import { PodcastResponse } from "@/entities/greenroom/model/types";
import { useGreenroomSessionStore } from "@/entities/greenroom/model/store";

const MAX_POLL_ATTEMPTS = 50;
const POLL_INTERVAL = 3000;

const wait = (ms: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

export function usePodcast() {
  const sessionId = useGreenroomSessionStore((state) => state.sessionId);

  const [data, setData] = useState<PodcastResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const requestIdRef = useRef(0);

  const fetchPodcast = useCallback(async () => {
    if (!sessionId) {
      setData(null);
      setIsLoading(false);
      setIsFetching(false);
      setIsError(true);
      setError(new Error("AI 세션 정보를 찾을 수 없어요."));
      return;
    }

    const requestId = ++requestIdRef.current;

    setData(null);
    setIsLoading(true);
    setIsFetching(true);
    setIsError(false);
    setError(null);

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= MAX_POLL_ATTEMPTS; attempt += 1) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      try {
        const response = await api.get<PodcastResponse>(
          "/greenroom/ai/tickets/podcast",
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
          setIsLoading(false);
          setIsFetching(false);
          setIsError(false);
          setError(null);
          return;
        }
      } catch (err) {
        if (requestId !== requestIdRef.current) {
          return;
        }

        lastError =
          err instanceof Error
            ? err
            : new Error("팟캐스트를 불러오지 못했어요.");
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
    setError(
      lastError ?? new Error("응답을 준비하는 데 시간이 오래 걸리고 있어요."),
    );
  }, [sessionId]);

  useEffect(() => {
    void fetchPodcast();

    return () => {
      requestIdRef.current += 1;
    };
  }, [fetchPodcast]);

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch: fetchPodcast,
  };
}
