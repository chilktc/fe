"use client";

import { AdminUser } from "@/entities/admin/model/types";

type OrgUserFormValue = Pick<
  AdminUser,
  "name" | "email" | "department" | "position" | "role"
>;

interface OrgUserFormFieldsProps {
  formData: OrgUserFormValue;
  onChange: <K extends keyof OrgUserFormValue>(
    field: K,
    value: OrgUserFormValue[K],
  ) => void;
  emailDisabled?: boolean;
  roleDisabled?: boolean;
}

export function OrgUserFormFields({
  formData,
  onChange,
  emailDisabled = false,
  roleDisabled = false,
}: OrgUserFormFieldsProps) {
  const inputStyles =
    "w-full border border-gray-400 rounded-[10px] h-[52px] px-4 text-body-4 text-gray-900 focus:outline-none focus:border-primary-400 disabled:opacity-50";
  const labelStyles = "text-label-1 text-gray-900 min-w-[60px]";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <label className={labelStyles}>이름</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={inputStyles}
          placeholder="이름을 입력하세요"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className={labelStyles}>이메일</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          className={inputStyles}
          placeholder="name@company.com"
          disabled={emailDisabled}
        />
      </div>

      <div className="flex items-center gap-3">
        <label className={labelStyles}>부서</label>
        <input
          type="text"
          value={formData.department}
          onChange={(e) => onChange("department", e.target.value)}
          className={inputStyles}
          placeholder="소속 부서를 입력하세요"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className={labelStyles}>직급</label>
        <input
          type="text"
          value={formData.position}
          onChange={(e) => onChange("position", e.target.value)}
          className={inputStyles}
          placeholder="직급을 입력하세요"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className={labelStyles}>권한</label>
        <div className="flex flex-1 gap-2.5">
          <button
            type="button"
            disabled={roleDisabled}
            onClick={() => onChange("role", "USER")}
            className={`flex-1 h-[52px] rounded-[10px] border transition-all text-button-1 disabled:opacity-50 disabled:cursor-not-allowed ${
              formData.role === "USER"
                ? "bg-primary-200 border-primary-400 text-gray-900 border-2"
                : "bg-gray-200 border-gray-400 text-gray-800"
            }`}
          >
            Member
          </button>
          <button
            type="button"
            disabled={roleDisabled}
            onClick={() => onChange("role", "ADMIN")}
            className={`flex-1 h-[52px] rounded-[10px] border transition-all text-button-1 disabled:opacity-50 disabled:cursor-not-allowed ${
              formData.role === "ADMIN"
                ? "bg-primary-200 border-primary-400 text-gray-900 border-2"
                : "bg-gray-200 border-gray-400 text-gray-800"
            }`}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}
