export const AUTH_ERROR_MESSAGES: Record<
  string,
  { title: string; description: string }
> = {
  oauth_failed: {
    title: "인증 실패",
    description: "로그인 하려면 다시 시도해주세요.",
  },
  no_code: {
    title: "인증 실패",
    description: "로그인 하려면 다시 시도해주세요.",
  },
  client_error: {
    title: "인증 실패",
    description: "로그인 하려면 다시 시도해주세요.",
  },
  token_exchange_failed: {
    title: "인증 실패",
    description: "로그인 하려면 다시 시도해주세요.",
  },
  user_info_failed: {
    title: "인증 실패",
    description: "로그인 하려면 다시 시도해주세요.",
  },
  email_not_registered: {
    title: "잘못된 로그인 시도",
    description:
      "등록되지 않은 이메일입니다.\n다시 시도하거나 다른 로그인 방법을 사용하세요.",
  },
  backend_failed: {
    title: "인증 실패",
    description: "로그인 처리 중 오류가 발생했습니다.",
  },
  server_error: {
    title: "서버 오류",
    description: "서버 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.",
  },
};
