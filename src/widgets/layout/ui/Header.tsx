"use client";

import { useAppRouter } from "@/shared/lib/router";
import { MenuIcon, NotificationIcon } from "@/shared/icons";
import { LogoLetter } from "@/shared/assets/logo";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useAppRouter();

  return (
    <header className="sticky top-0 left-0 right-0 h-16 px-1 py-2 flex items-center justify-center z-30 bg-[#1A1A1A] shrink-0">
      <div
        className="absolute left-1 w-12 h-12 flex items-center justify-center cursor-pointer"
        onClick={onMenuClick}
      >
        <MenuIcon />
      </div>
      <button
        type="button"
        className="absolute right-1 w-12 h-12 flex items-center justify-center cursor-pointer"
        onClick={() => router.push("/notifications")}
      >
        <NotificationIcon />
      </button>
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <LogoLetter className="w-auto! h-4!" />
      </div>
    </header>
  );
}
