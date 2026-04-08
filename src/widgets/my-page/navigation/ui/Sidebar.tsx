import { useState } from "react";
import { User } from "@/entities/user/model/types";
import { Link } from "react-router-dom";
import { SIDEBAR_MENU_ITEMS } from "../model/menu";
import { Divide, Modal } from "@/shared/ui";
import { WarningIcon } from "@/shared/icons";
import { useLogout } from "@/features/auth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export function Sidebar({ isOpen, onClose, user }: SidebarProps) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

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
        className={`absolute top-0 left-0 h-dvh w-[285px] max-w-[90%] py-4 bg-gray-200 shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out border-r border-gray-400 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="px-7.5 py-4">
            <div className="flex items-center space-x-6">
              <div className="flex-1">
                <p className="text-label-1 text-gray-900">{user.nickname}</p>
                <p className="text-caption-2 text-gray-800">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-4">
            <Divide className="bg-gray-400" />
          </div>

          <nav className="flex-1 py-4 space-y-4 overflow-y-auto px-7.5">
            {SIDEBAR_MENU_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center text-heading-6 text-gray-900 hover:text-primary-600 transition-colors"
                onClick={onClose}
              >
                <span className="text-label-1">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="w-full flex py-2.5 px-7.5">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="hover:cursor-pointer text-accent-red text-button-1 outline-none"
            >
              로그아웃
            </button>
          </div>
        </div>
      </aside>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onSubmit={handleLogout}
        submitLabel="로그아웃"
        isSubmitLoading={isPending}
      >
        <div className="flex flex-col items-center gap-4">
          <WarningIcon />
          <div className="space-y-1">
            <h3 className="text-heading-5 text-gray-900 text-center">
              정말 로그아웃 하시겠습니까?
            </h3>
            <p className="text-body-6 text-gray-800 text-center whitespace-pre-line">
              로그아웃하면 이 기기에서 검색 기록이{`\n`}삭제됩니다. 동기화된
              검색 기록은 다시{`\n`}로그인하면 사용할 수 있습니다.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
