import React from "react";
import { AuthWrapper } from "@/features/auth";
import Sidebar from "@/components/Sidebar";

interface HubLayoutProps {
  children: React.ReactNode;
}

const HubLayout = ({ children }: HubLayoutProps) => {
  return (
    <AuthWrapper>
      <div className="flex h-screen w-full overflow-hidden bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)] text-slate-50 ">
        <Sidebar />
        <main className="flex-1 overflow-y-auto animate-in duration-500 fade-in">
          {children}
        </main>
      </div>
    </AuthWrapper>
  );
};

export default HubLayout;
