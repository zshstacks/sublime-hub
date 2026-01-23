"use client";

import React from "react";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { LatencyCharts } from "./LatencyCharts";
import { IncidentTimeline } from "./IncidentTimeline";

import { MonitorDetailsProps } from "@/features/monitor/types";
import { AppDispatch } from "@/redux/store";
import { deleteMonitor } from "@/redux/monitorSlice/asyncActions";

export const MonitorDetails = ({ onBack, monitor }: MonitorDetailsProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${monitor.name}?`)) {
      const result = await dispatch(deleteMonitor(monitor.ID));
      if (deleteMonitor.fulfilled.match(result)) {
        onBack();
      }
    }
  };

  const isUp = monitor.status === "up";

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3 sm:gap-5">
          <button
            onClick={onBack}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 border border-white/5 rounded-lg sm:rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer group w-fit flex-shrink-0 mt-1 sm:mt-0"
          >
            <FiArrowLeft
              size={16}
              className="sm:w-[18px] sm:h-[18px] text-[#38CA6B]"
            />
          </button>
          <div className="min-w-0 flex-1">
            <div
              className={`flex items-center gap-2 ${isUp ? "text-[#38CA6B]" : "text-rose-500"} mb-0.5`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${isUp ? "bg-[#38CA6B] animate-pulse" : "bg-rose-500"}`}
              />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.2em]">
                {monitor.is_active ? "Live Monitoring" : "Paused"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight truncate">
              {monitor.name}
            </h1>
            <p className="text-[10px] sm:text-[11px] text-white/20 font-mono tracking-tight truncate">
              {monitor.url}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end lg:justify-start">
          <button
            onClick={handleDelete}
            className="p-2.5 sm:p-3 bg-white/5 border border-white/5 rounded-lg sm:rounded-xl text-white/40 hover:text-rose-500 transition-all cursor-pointer"
          >
            <FiTrash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left side: Charts & Timeline */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          <LatencyCharts monitorId={monitor.ID} />
          <IncidentTimeline heartbeats={monitor.heartbeats} />
        </div>

        {/* Right side: Sidebar Details */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          {/* Stats Card */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
            <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-white/30 mb-3 sm:mb-4 text-center">
              Monitor Configuration
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2 sm:pb-3">
                <span className="text-[10px] sm:text-xs text-white/40">
                  Check Interval
                </span>
                <span className="text-[10px] sm:text-xs text-white font-bold font-mono">
                  {monitor.interval}s
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2 sm:pb-3">
                <span className="text-[10px] sm:text-xs text-white/40">
                  Response Timeout
                </span>
                <span className="text-[10px] sm:text-xs text-white font-bold font-mono">
                  {monitor.timeout}s
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-xs text-white/40">
                  Monitor Type
                </span>
                <span className="text-[9px] sm:text-[10px] bg-white/10 px-1.5 sm:px-2 py-0.5 rounded text-white font-bold uppercase">
                  {monitor.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
