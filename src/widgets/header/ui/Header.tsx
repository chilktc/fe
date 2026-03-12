"use client";

import { useRouter } from "next/navigation";
import { MenuIcon } from "@/shared/icons";
import { LogoLetter } from "@/shared/assets/logo";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();

  return (
    // TODO 커서 포인터 적용 안되고 있음
    <header className="sticky top-0 left-0 right-0 h-16 px-1 py-2 flex items-center justify-center z-30 bg-[#1A1A1A] shrink-0">
      <div
        className="absolute left-1 w-12 h-12 flex items-center justify-center cursor-pointer"
        onClick={onMenuClick}
      >
        <MenuIcon />
      </div>
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <LogoLetter />
      </div>
    </header>
  );
}
