"use client";

import React, { useState } from "react";
import {
  FiChevronDown,
  FiFilter,
  FiPlus,
  FiSearch,
  FiActivity,
} from "react-icons/fi";

import { MonitorCard } from "./components/MonitorCard";
import { StatsSidebar } from "./components/StatsSidebar";

import { MonitorDetails } from "./components/MonitorDetails";
import Link from "next/link";

const MonitorView = () => {
  const [selectedMonitor, setSelectedMonitor] = useState<string | null>(null);

  const handleBack = () => setSelectedMonitor(null);

  const handleSelectMonitor = (name: string) => setSelectedMonitor(name);

  return (
    <div className="flex flex-col w-full min-h-full p-8 animate-in fade-in duration-500 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      {selectedMonitor ? (
        <MonitorDetails onBack={handleBack} />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10 w-full">
            <div>
              <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
                <FiActivity size={14} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  System Status
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Monitoring
              </h1>
            </div>

            <div className="flex items-center shadow-lg shadow-[#38CA6B]/10">
              <Link href="/hub/monitor/new">
                <button className="bg-[#38CA6B] hover:bg-[#2fb15d] px-6 py-2.5 rounded-l-xl flex items-center gap-2 font-bold text-white transition-all cursor-pointer active:scale-95">
                  <FiPlus size={18} /> New Monitor
                </button>
              </Link>

              <div className="w-[1px] h-11 bg-white/10" />
              <button className="bg-[#38CA6B] hover:bg-[#2fb15d] px-3 py-2.5 rounded-r-xl text-white transition-all cursor-pointer active:scale-95">
                <FiChevronDown size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
            {/* LEFT COLUMN: Filters & List */}
            <div className="flex-1 w-full space-y-6">
              {/* Segmented Control & Search Bar Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 ml-2">
                  <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-bold text-[#38CA6B] font-mono">
                    0 / 1
                  </div>
                  <button className="text-white/40 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">
                    Show groups
                  </button>
                </div>

                <div className="flex items-center gap-3 flex-1 max-w-2xl justify-end">
                  <div className="relative flex-1 max-w-sm group">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
                    <input
                      type="text"
                      placeholder="Search by name or url..."
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all shadow-inner"
                    />
                  </div>
                  <button className="bg-white/5 border border-white/5 p-2.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer text-[#38CA6B]">
                    <FiFilter size={18} />
                  </button>
                  <button className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl text-xs font-bold text-white/60 hover:text-white transition-all cursor-pointer uppercase tracking-widest">
                    Down first <FiChevronDown />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div onClick={() => handleSelectMonitor("youtube.com")}>
                  <MonitorCard />
                </div>
                <div onClick={() => handleSelectMonitor("youtube.com")}>
                  <MonitorCard />
                </div>
                <div onClick={() => handleSelectMonitor("youtube.com")}>
                  <MonitorCard />
                </div>
                <div onClick={() => handleSelectMonitor("youtube.com")}>
                  <MonitorCard />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sidebar Stats */}
            <StatsSidebar />
          </div>
        </>
      )}
    </div>
  );
};

export default MonitorView;
