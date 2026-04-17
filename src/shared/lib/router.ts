import { useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function useAppRouter() {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      push: (to: string) => navigate(to),
      replace: (to: string) => navigate(to, { replace: true }),
      back: () => navigate(-1),
    }),
    [navigate],
  );
}

export function usePathname() {
  return useLocation().pathname;
}

export function useQueryParams() {
  return useSearchParams()[0];
}
