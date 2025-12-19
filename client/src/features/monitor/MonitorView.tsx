"use client";

import React from "react";
import { FiChevronDown, FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import { MonitorCard } from "./components/MonitorCard";
import { StatsSidebar } from "./components/StatsSidebar";

const MonitorView = () => {
  return (
    <div className="flex flex-col w-full h-full text-white p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10 w-full">
        <h1 className="text-3xl font-bold tracking-tight">Monitoring</h1>
        <div className="flex items-center shadow-lg shadow-indigo-500/20">
          <button className="bg-[#4F46E5] hover:bg-[#4338CA] px-5 py-2.5 rounded-l-lg flex items-center gap-2 font-semibold transition-all">
            <FiPlus size={18} /> New
          </button>
          <div className="w-[1px] h-10 bg-white/10" />
          <button className="bg-[#4F46E5] hover:bg-[#4338CA] px-3 py-2.5 rounded-r-lg transition-all">
            <FiChevronDown size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
        {/* LEFT COLUMN: Filters & List */}
        <div className="flex-1 w-full space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#14202D] border border-white/5 rounded-md px-3 py-2 text-xs font-medium text-white/40">
                0 / 1
              </div>
              <button className="bg-white/5 border border-white/5 hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Show groups
              </button>
            </div>
            <div className="flex items-center gap-3 flex-1 max-w-2xl justify-end">
              <div className="relative flex-1 max-w-sm">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="text"
                  placeholder="Search by name or url"
                  className="w-full bg-[#14202D] border border-white/5 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#38CA6B]/30 transition-all"
                />
              </div>
              <button className="bg-white/5 border border-white/5 p-2.5 rounded-md hover:bg-white/10 transition-colors">
                <FiFilter className="text-white/60" />
              </button>
              <button className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-md text-sm text-white/60 hover:text-white transition-colors">
                Down first <FiChevronDown />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <MonitorCard />
            {/* .map redux otw*/}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Stats */}
        <StatsSidebar />
      </div>
    </div>
  );
};

export default MonitorView;
