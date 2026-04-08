export interface ApiEnvelope<T> {
  code: string;
  message: string;
  data: T;
}

export function unwrapData<T>(response: T | { data?: T } | null | undefined): T {
  if (response && typeof response === "object" && "data" in response) {
    const nested = response.data;
    if (nested === undefined || nested === null) {
      throw new Error("Response data is empty");
    }
    return nested;
  }

  if (response === undefined || response === null) {
    throw new Error("Response is empty");
  }

  return response as T;
}

export function isApiEnvelope<T>(
  response: unknown,
): response is ApiEnvelope<T> {
  return (
    !!response &&
    typeof response === "object" &&
    "code" in response &&
    "message" in response &&
    "data" in response
  );
}

export function ensureApiEnvelope<T>(
  response: ApiEnvelope<T> | T | { data?: T } | null | undefined,
  message = "성공",
): ApiEnvelope<T> {
  if (isApiEnvelope<T>(response)) {
    return response;
  }

  return {
    code: "SUCCESS",
    message,
    data: unwrapData<T>(response),
  };
}
