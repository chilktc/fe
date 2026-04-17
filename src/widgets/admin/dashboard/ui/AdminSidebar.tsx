"use client";

import Image from "@/shared/ui/Image";
import { Link } from "react-router-dom";
import { usePathname, useQueryParams } from "@/shared/lib/router";
import { ChevronRightIcon } from "@/shared/icons";

const ADMIN_MENU = [
  { label: "조직계정관리", tab: "org-account" },
  { label: "마인드 온톨로지", tab: "mind-ontology" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useQueryParams();
  const activeTab = searchParams.get("tab") || "org-account";

  return (
    <aside className="w-[300px] min-w-[300px] min-h-dvh bg-gray-100 flex flex-col sticky top-0">
      {/* Logo */}
      <div className="px-7.5 py-2.5 h-20 flex justify-start items-center border-b border-gray-400">
        {/* temp-logo-horizontal.png */}
        <Image
          src="/temp-logo-horizontal.png"
          alt="Logo"
          width={100}
          height={100}
        />
      </div>
      {/* Navigation */}
      <nav className="flex-1">
        {ADMIN_MENU.map((item) => {
          const isActive = activeTab === item.tab;
          const href = `${pathname}?tab=${item.tab}`;
          return (
            <Link
              key={item.tab}
              to={href}
              className={`flex items-center justify-between px-6 py-3.5 text-label-1 transition-colors border-b border-gray-400 ${
                isActive
                  ? "text-heading-6 text-primary-400"
                  : "text-body-3 text-gray-900"
              }`}
            >
              {item.label}
              <ChevronRightIcon
                className={`text-xs ${isActive ? "stroke-primary-400" : "stroke-gray-900"}`}
              />
            </Link>
          );
        })}
      </nav>
      {/* User Info
      <div className="px-4 py-4">
        <button className="w-full flex items-center gap-3 p-2 text-left">
          <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center text-white text-label-2 shrink-0">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-body-3 text-white truncate">
              {user?.nickname ?? "관리자"}
            </p>
            <p className="text-body-7 text-gray-800 truncate">개인정보수정</p>
          </div>
          <ChevronRightIcon className="stroke-gray-900" />
        </button>
      </div> */}
    </aside>
  );
}
