"use client";

import { useQueryParams } from "@/shared/lib/router";
import { AUTH_ERROR_MESSAGES } from "../model/constants";
import { ErrorIcon } from "@/shared/icons/error-icon";

export function AuthError() {
  const searchParams = useQueryParams();
  const errorCode = searchParams.get("error");

  if (!errorCode || !AUTH_ERROR_MESSAGES[errorCode]) {
    return null;
  }

  return (
    <div className="w-full px-4 py-3.5 rounded-2xl border border-gray-400 bg-gray-200 flex items-start space-x-[9px]">
      <div className="pt-[3px]">
        <ErrorIcon />
      </div>
      <div>
        <p className="text-heading-6 text-accent-red">
          {AUTH_ERROR_MESSAGES[errorCode].title}
        </p>
        <p className="text-body-5 whitespace-pre-line text-gray-700">
          {AUTH_ERROR_MESSAGES[errorCode].description}
        </p>
      </div>
    </div>
  );
}
