import { Profile } from "@/entities/user/ui";
import { User } from "@/entities/user/model/types";
import Link from "next/link";
import { SIDEBAR_MENU_ITEMS } from "../model/menu";
import { Divide } from "@/shared/ui";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export function Sidebar({ isOpen, onClose, user }: SidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`absolute top-0 left-0 h-dvh w-[285px] py-4 bg-gray-200 shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out border-r border-gray-400 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="px-7.5 pb-4">
            <div className="flex items-center space-x-6">
              <Profile
                src={user.profileImage}
                nickname={user.nickname}
                size={64}
              />
              <div className="flex-1">
                <p className="text-label-1 text-foreground">{user.nickname}</p>
                <p className="text-caption-2 text-gray-800">{user.email}</p>
              </div>
            </div>
          </div>
          <Divide className="bg-gray-100" />

          <nav className="flex-1 py-4 space-y-4 overflow-y-auto px-7.5">
            {SIDEBAR_MENU_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center text-foreground hover:text-primary-600 transition-colors"
                onClick={onClose}
              >
                <span className="text-label-1">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="w-full flex py-2.5 px-7.5">
            <p className="hover:cursor-pointer text-accent-red text-button-1">
              로그아웃
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
