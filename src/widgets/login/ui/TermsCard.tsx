"use client";

import { useState } from "react";
import { Button, Divide, CheckSquare } from "@/shared/ui";
import { TermsHeader } from "./TermsHeader";
import { AgreementItem } from "./AgreementItem";

export function TermsCard() {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const allAgreed =
    agreements.terms && agreements.privacy && agreements.marketing;

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
            label="[필수] 서비스 이용약관 동의"
            checked={agreements.terms}
            onToggle={() => handleToggle("terms")}
          />
          <AgreementItem
            label="[필수] 개인정보 수집 및 이용 동의"
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
        <Button className="w-full">동의하고 가입하기</Button>
      </div>
    </div>
  );
}
