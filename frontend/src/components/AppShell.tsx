"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import SessionManager from "./SessionManager";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <SessionManager>
      {!isLoginPage && <Sidebar />}
      {isLoginPage ? (
        children
      ) : (
        <main className="ml-0 md:ml-72 h-screen flex flex-col bg-transparent">
          <TopBar />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      )}
    </SessionManager>
  );
}
