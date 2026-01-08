"use client";

import React, { useState } from "react";
import {
  RiUserLine,
  RiLockPasswordLine,
  RiHardDrive2Line,
} from "react-icons/ri";
import { FiLayout } from "react-icons/fi";

import { ProfileView } from "./components/ProfileView";
import { BillingView } from "./components/BillingView";

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="w-full min-h-full p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full">
        <div>
          <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
            <FiLayout size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Control Center
            </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Settings
          </h1>
        </div>

        {/* Quick Stats pill */}
        <div className="hidden md:flex bg-white/5 border border-white/5 rounded-2xl p-1.5 px-4 items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-white/20 uppercase">
              Last Login
            </span>
            <span className="text-xs font-mono text-[#38CA6B]">127.0.0.1</span>
          </div>
          <div className="w-px h-6 bg-white/5" />
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-white/20 uppercase">
              Status
            </span>
            <span className="text-xs font-bold text-white uppercase tracking-tighter">
              Verified
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <SettingNavButton
            icon={<RiUserLine size={20} />}
            label="Account details"
            active={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          />
          <SettingNavButton
            icon={<RiLockPasswordLine size={20} />}
            label="Security"
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
          />
          <SettingNavButton
            icon={<RiHardDrive2Line size={20} />}
            label="Billing"
            active={activeTab === "billing"}
            onClick={() => setActiveTab("billing")}
          />
        </div>

        {/* Content Section */}
        <div className="lg:col-span-9">
          {activeTab === "account" && <ProfileView />}
          {activeTab === "billing" && <BillingView />}

          {/* placeholder  */}
          {activeTab === "security" && (
            <div className="bg-white/5 border border-white/5 rounded-[2rem] p-12 text-center">
              <RiLockPasswordLine
                className="mx-auto text-white/10 mb-4"
                size={48}
              />
              <p className="text-white/40 font-bold uppercase tracking-widest text-xs">
                Security Module under refactor
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SettingNavButton = ({ icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[13px] transition-all duration-300 group cursor-pointer w-full text-left ${
      active
        ? "bg-white/5 border border-[#38CA6B]/30 text-white shadow-xl"
        : "text-white/20 hover:text-white hover:bg-white/[0.02] border border-transparent"
    }`}
  >
    <span
      className={`transition-all ${active ? "text-[#38CA6B] drop-shadow-[0_0_8px_#38CA6B]" : "group-hover:text-white"}`}
    >
      {icon}
    </span>
    <span className="tracking-tight uppercase text-[11px] font-black">
      {label}
    </span>
    {active && (
      <div className="ml-auto w-1.5 h-1.5 bg-[#38CA6B] rounded-full shadow-[0_0_10px_#38CA6B]" />
    )}
  </button>
);

export default SettingsView;
