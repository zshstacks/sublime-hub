import React from "react";
import { FiArrowLeft, FiSettings, FiTrash2, FiPause } from "react-icons/fi";
import { LatencyCharts } from "./LatencyCharts";
import { IncidentTimeline } from "./IncidentTimeline";
import { RegionStatus } from "./RegionStatus";

interface MonitorDetailsProps {
  onBack: () => void;
}

export const MonitorDetails = ({ onBack }: MonitorDetailsProps) => {
  return (
    <div className="flex flex-col gap-8 animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <button
            onClick={onBack}
            className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer group w-fit"
          >
            <FiArrowLeft size={18} className=" text-[#38CA6B]" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-[#38CA6B] mb-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#38CA6B] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Live Monitoring
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              youtube.com
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white transition-all cursor-pointer">
            <FiPause size={18} />
          </button>
          <button className="p-3 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-rose-500 transition-all cursor-pointer">
            <FiTrash2 size={18} />
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#38CA6B] text-white font-bold rounded-xl hover:bg-[#2fb15d] transition-all cursor-pointer shadow-lg shadow-[#38CA6B]/10">
            <FiSettings size={18} /> Settings
          </button>
        </div>
      </div>

      {/* Head grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left side: big components */}
        <div className="lg:col-span-8 space-y-6">
          <LatencyCharts />
          <IncidentTimeline />
        </div>

        {/* Right side: Sidebar details */}
        <div className="lg:col-span-4 space-y-6">
          <RegionStatus />
          {/* Stats */}
          <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">
              Monitor Info
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/40">Check Interval</span>
                <span className="text-xs text-white font-bold font-mono">
                  60s
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/40">Response Timeout</span>
                <span className="text-xs text-white font-bold font-mono">
                  30s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
