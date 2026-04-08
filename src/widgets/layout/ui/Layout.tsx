import type { PropsWithChildren } from "react";
import type { User } from "@/entities/user/model/types";
import { Sidebar } from "@/widgets/my-page";
import { Header } from "./Header";
import { useSidebar } from "../model/useSidebar";

interface LayoutProps extends PropsWithChildren {
  user: User;
  className?: string;
  contentClassName?: string;
}

export function Layout({
  children,
  user,
  className = "relative bg-[#1A1A1A] flex-1 min-h-dvh w-full overflow-hidden flex flex-col",
  contentClassName = "flex-1 px-4 z-10 flex flex-col min-h-0",
}: LayoutProps) {
  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebar();

  return (
    <div className={className}>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} user={user} />
      <Header onMenuClick={openSidebar} />
      <main className={contentClassName}>{children}</main>
    </div>
  );
}
