"use client";

import Image from "@/shared/ui/Image";
import { Link } from "react-router-dom";
import { usePathname, useQueryParams } from "@/shared/lib/router";

const ADMIN_MENU = [
  { label: "조직계정관리", tab: "org-account" },
  { label: "마인드 온톨로지", tab: "mind-ontology" },
];

export function AdminHeader() {
  const pathname = usePathname();
  const searchParams = useQueryParams();
  const activeTab = searchParams.get("tab") || "org-account";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-[#2B2B2B] bg-[#171717]">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        <Link to="/admin?tab=org-account" className="flex items-center">
          <Image
            src="/temp-logo-horizontal.png"
            alt="Bloom"
            width={100}
            height={20}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="flex items-center text-heading-5">
          {ADMIN_MENU.map((item, index) => {
            const isActive = activeTab === item.tab;
            const href = `${pathname}?tab=${item.tab}`;
            const separatorClass =
              index === 0 ? "pr-3" : "border-l border-[#3A3A3A] pl-3";

            return (
              <Link
                key={item.tab}
                to={href}
                className={
                  isActive
                    ? `${separatorClass} text-primary-400`
                    : `${separatorClass} text-gray-300 transition-colors hover:text-white`
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
