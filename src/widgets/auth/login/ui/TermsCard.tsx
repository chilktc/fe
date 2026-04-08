"use client";

import { useState, useEffect } from "react";
import { useAppRouter, useQueryParams } from "@/shared/lib/router";
import { Button, Divide, CheckSquare } from "@/shared/ui";
import { useSessionStore } from "@/entities/session/model/store";
import { TermsHeader } from "./TermsHeader";
import { AgreementItem } from "./AgreementItem";
import { TermsComplete } from "./TermsComplete";
import { useAgreeTerms } from "@/features/auth/model/use-agree-terms";

export function TermsCard() {
  const router = useAppRouter();
  const searchParams = useQueryParams();
  const { user, setUser } = useSessionStore();

  const redirectQuery = searchParams.get("redirect_url");
  const redirectUrl =
    redirectQuery &&
    redirectQuery.startsWith("/") &&
    !redirectQuery.startsWith("//")
      ? redirectQuery
      : "/";

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const { mutate: agreeTerms, isPending } = useAgreeTerms();

  // 이미 가입을 완료한 기존 사용자가 허가 없이 /login/terms 로 접근했을 때 차단
  // (단, 지금 막 가입을 완료해서 isCompleted UI를 보고 있는 중이면 예외로 허용)
  useEffect(() => {
    if (user && !user.firstLogin && !isCompleted) {
      router.replace(redirectUrl);
    }
  }, [user, isCompleted, router, redirectUrl]);

  const allAgreed =
    agreements.terms && agreements.privacy && agreements.marketing;
  const mandatoryAgreed = agreements.terms && agreements.privacy;

  const handleToggleAll = () => {
    const newValue = !allAgreed;
    setAgreements({
      terms: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const handleToggle = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAgree = () => {
    if (!mandatoryAgreed || isPending) return;

    // 서버에 약관 동의 내역 전송 API 호출
    agreeTerms(agreements, {
      onSuccess: () => {
        setIsCompleted(true);
        if (user) {
          setUser({ ...user, firstLogin: false });
        }
      },
      onError: (error) => {
        console.error("Failed to agree terms:", error);
        // 에러 처리 추가 가능
      },
    });
  };

  if (isCompleted) {
    return <TermsComplete redirectUrl={redirectUrl} />;
  }

  return (
    <div className="w-full bg-gray-200 border border-gray-400 py-4 rounded-2xl">
      <TermsHeader />

      <div className="space-y-4 px-8 py-4">
        {/* 전체 동의 */}
        <div
          className="flex items-center space-x-2 hover:cursor-pointer"
          onClick={handleToggleAll}
        >
          <CheckSquare className="w-6 h-6" isActive={allAgreed} />
          <span className={`text-body-5 text-gray-900`}>
            전체 약관에 동의합니다.
          </span>
        </div>

        <Divide className="bg-gray-400" />

        {/* 개별 항목 */}
        <div className="space-y-4">
          <AgreementItem
            label="[필수] 서비스 이용약관"
            checked={agreements.terms}
            onToggle={() => handleToggle("terms")}
          />
          <AgreementItem
            label="[필수] 개인정보 처리방침"
            checked={agreements.privacy}
            onToggle={() => handleToggle("privacy")}
          />
          <AgreementItem
            label="[선택] 마케팅 정보 수신 동의"
            checked={agreements.marketing}
            onToggle={() => handleToggle("marketing")}
          />
        </div>
      </div>

      <div className="py-4 px-6">
        <Button
          className="w-full"
          disabled={!mandatoryAgreed || isPending}
          onClick={handleAgree}
        >
          {isPending ? "처리중..." : "동의하고 가입하기"}
        </Button>
      </div>
    </div>
  );
}
