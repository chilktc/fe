export const AUTH_ERROR_MESSAGES: Record<
  string,
  { title: string; description: string }
> = {
  CLIENT_ERROR: {
    title: "인증 실패",
    description: "로그인 하려면 다시 시도해주세요.",
  },
  OAUTH_TOKEN_EXCHANGE_FAILED: {
    title: "인증 실패",
    description: "로그인 하려면 다시 시도해주세요.",
  },
  OAUTH_USERINFO_FAILED: {
    title: "인증 실패",
    description: "로그인 하려면 다시 시도해주세요.",
  },
  OAUTH_EMAIL_NOT_REGISTERED: {
    title: "잘못된 로그인 시도",
    description:
      "등록되지 않은 이메일입니다.\n다시 시도하거나 다른 로그인 방법을 사용하세요.",
  },
  server_error: {
    title: "서버 오류",
    description: "서버 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.",
  },
  is_not_admin: {
    title: "잘못된 로그인 시도",
    description: "관리자 계정으로 로그인해주세요.",
  },
};
