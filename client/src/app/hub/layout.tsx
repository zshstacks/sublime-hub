import React from "react";
import { AuthWrapper } from "@/features/auth";
import Sidebar from "@/components/Sidebar";

interface HubLayoutProps {
  children: React.ReactNode;
}

const HubLayout = ({ children }: HubLayoutProps) => {
  return (
    <AuthWrapper>
      <div className="flex h-screen w-full overflow-hidden bg-[#131A25] text-slate-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </AuthWrapper>
  );
};

export default HubLayout;
