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
    <div className="flex flex-col w-full min-h-full p-8 animate-in fade-in duration-500 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      {selectedMonitorId && selectedMonitor ? (
        <MonitorDetails monitor={selectedMonitor} onBack={handleBack} />
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
                <button className="bg-[#38CA6B] hover:bg-[#2fb15d] px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold text-white transition-all cursor-pointer active:scale-95">
                  <FiPlus size={18} /> New Monitor
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
            {/* LEFT COLUMN: Filters & List */}
            <div className="flex-1 w-full space-y-6">
              {/* Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 ml-2">
                  <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-bold text-[#38CA6B] font-mono">
                    {items.length}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-1 max-w-2xl justify-end">
                  <div className="relative flex-1 max-w-sm group">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name or url..."
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* Monitor List */}
              <div className="space-y-3">
                {loading && items.length === 0 ? (
                  <div className="flex flex-col items-center py-20 text-white/20 gap-4">
                    <div className="w-8 h-8 border-2 border-[#38CA6B] border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-bold uppercase tracking-widest">
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
                  <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-2xl p-12 text-center">
                    <p className="text-white/20 text-sm">
                      No monitors found matching your search.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="text-rose-500 text-center text-xs p-4">
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
