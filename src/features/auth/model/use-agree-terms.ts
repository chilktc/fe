import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/base";

export interface AgreeTermsRequest {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

export const useAgreeTerms = () => {
  return useMutation({
    mutationFn: async (agreements: AgreeTermsRequest) => {
      return await api.post("/api/auth/consent", agreements);
    },
  });
};
