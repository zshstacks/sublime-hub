"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonitors } from "@/redux/monitorSlice/asyncActions";

const MonitorView = () => {
  const { items, error, loading } = useSelector(
    (state: RootState) => state.monitor,
  );
  const dispatch: AppDispatch = useDispatch();

  const [selectedMonitorId, setSelectedMonitorId] = useState<number | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => setSelectedMonitorId(null);

  const filteredMonitors = useMemo(() => {
    return items.filter(
      (m) =>
        m.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        m.url.toLocaleLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [items, searchQuery]);

  useEffect(() => {
    dispatch(fetchMonitors());
  }, [dispatch]);

  const selectedMonitor = items.find((m) => m.ID === selectedMonitorId);

  return (
    <div className="flex flex-col w-full min-h-full p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      {selectedMonitorId && selectedMonitor ? (
        <MonitorDetails monitor={selectedMonitor} onBack={handleBack} />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 lg:mb-10 w-full gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
                <FiActivity size={12} className="sm:w-3.5 sm:h-3.5" />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.2em]">
                  System Status
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Monitoring
              </h1>
            </div>

            <div className="flex items-center shadow-lg shadow-[#38CA6B]/10 w-full sm:w-auto">
              <Link href="/hub/monitor/new" className="w-full sm:w-auto">
                <button className="bg-[#38CA6B] hover:bg-[#2fb15d] px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 font-bold text-white transition-all cursor-pointer active:scale-95 w-full sm:w-auto text-sm">
                  <FiPlus size={16} className="sm:w-[18px] sm:h-[18px]" /> New
                  Monitor
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 w-full items-start">
            {/* LEFT COLUMN: Filters & List */}
            <div className="flex-1 w-full space-y-4 sm:space-y-6">
              {/* Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 bg-white/5 p-3 sm:p-2 rounded-xl sm:rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 sm:ml-2 justify-center sm:justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-bold text-[#38CA6B] font-mono">
                    {items.length}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-1 w-full sm:max-w-2xl sm:justify-end">
                  <div className="relative flex-1 sm:max-w-sm group">
                    <FiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors w-4 h-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name or url..."
                      className="w-full bg-white/5 border border-white/5 rounded-lg sm:rounded-xl py-2 sm:py-2.5 pl-10 sm:pl-11 pr-3 sm:pr-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* Monitor List */}
              <div className="space-y-2 sm:space-y-3 max-h-[500px] sm:max-h-[680px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                {loading && items.length === 0 ? (
                  <div className="flex flex-col items-center py-12 sm:py-20 text-white/20 gap-3 sm:gap-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-[#38CA6B] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                      Waking up workers...
                    </p>
                  </div>
                ) : filteredMonitors.length > 0 ? (
                  filteredMonitors.map((monitor) => (
                    <div
                      key={monitor.ID}
                      onClick={() => setSelectedMonitorId(monitor.ID)}
                      className="cursor-pointer group active:scale-[0.99] transition-transform"
                    >
                      <MonitorCard monitor={monitor} />
                    </div>
                  ))
                ) : (
                  <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center">
                    <p className="text-white/20 text-xs sm:text-sm">
                      No monitors found matching your search.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="text-rose-500 text-center text-[10px] sm:text-xs p-3 sm:p-4">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Sidebar Stats */}
            <StatsSidebar monitors={items} />
          </div>
        </>
      )}
    </div>
  );
};

export default MonitorView;
