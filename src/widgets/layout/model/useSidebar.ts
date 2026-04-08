import { useState } from "react";

export function useSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return {
    isSidebarOpen,
    openSidebar: () => setIsSidebarOpen(true),
    closeSidebar: () => setIsSidebarOpen(false),
  };
}
