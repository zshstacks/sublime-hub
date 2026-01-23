"use client";

import React from "react";
import { FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";
import { format, formatDistanceToNow } from "date-fns";
import { IncidentTimelineProps } from "@/features/monitor/types";

export const IncidentTimeline = ({
  heartbeats = [],
}: IncidentTimelineProps) => {
  if (!heartbeats || heartbeats.length === 0) {
    return (
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center">
        <FiClock className="mx-auto text-white/10 mb-2 sm:mb-3 w-5 h-5 sm:w-6 sm:h-6" />
        <p className="text-white/20 text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest">
          No events recorded yet
        </p>
      </div>
    );
  }

  const sortedHeartbeats = [...heartbeats].sort(
    (a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime(),
  );

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-2">
        <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.2em] text-white/30">
          Live Heartbeats
        </h3>
        <span className="text-[8px] sm:text-[9px] text-white/20 font-mono bg-white/5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
          {heartbeats.length} checks
        </span>
      </div>

      <div className="max-h-[240px] sm:max-h-[280px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar space-y-0">
        {sortedHeartbeats.map((hb, i) => {
          const isUp = hb.status_code >= 200 && hb.status_code < 300;
          const timeLabel = format(new Date(hb.CreatedAt), "MMM d, HH:mm:ss");
          const timeAgo = formatDistanceToNow(new Date(hb.CreatedAt), {
            addSuffix: true,
          });

          return (
            <div
              key={hb.ID}
              className="relative flex gap-4 sm:gap-6 pb-4 sm:pb-6 last:pb-0 group"
            >
              {/* Timeline Line */}
              {i !== sortedHeartbeats.length - 1 && (
                <div className="absolute left-[9px] sm:left-[11px] top-5 sm:top-6 w-[1px] h-full bg-white/5 group-hover:bg-[#38CA6B]/20 transition-colors" />
              )}

              {/* Status Icon */}
              <div
                className={`relative z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-[3px] sm:border-4 border-[#0B121A] transition-transform group-hover:scale-110 shrink-0 ${
                  isUp
                    ? "bg-[#38CA6B] text-[#0B121A]"
                    : "bg-rose-500 text-white"
                }`}
              >
                {isUp ? (
                  <FiCheckCircle className="w-2.5 h-2.5 sm:w-[10px] sm:h-[10px]" />
                ) : (
                  <FiAlertCircle className="w-2.5 h-2.5 sm:w-[10px] sm:h-[10px]" />
                )}
              </div>

              {/* Content Card */}
              <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-center bg-white/[0.01] hover:bg-white/[0.03] border border-transparent hover:border-white/5 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 -mt-1.5 sm:-mt-2 transition-all gap-2 sm:gap-0 min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                      {isUp ? "Healthy Check" : "Service Issue"}
                    </span>
                    <span
                      className={`text-[8px] sm:text-[9px] font-black px-1 sm:px-1.5 py-0.5 rounded border font-mono ${
                        isUp
                          ? "border-[#38CA6B]/20 text-[#38CA6B]"
                          : "border-rose-500/20 text-rose-500"
                      }`}
                    >
                      {hb.status_code}
                    </span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-white/30 mt-0.5">
                    Latency:{" "}
                    <span className="text-white/60 font-mono">
                      {hb.latency.toFixed(2)}ms
                    </span>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-[10px] sm:text-[11px] font-mono font-bold text-white/60">
                    {timeLabel}
                  </div>
                  <div className="text-[8px] sm:text-[9px] uppercase font-bold text-white/10 mt-0.5 sm:mt-1">
                    {timeAgo}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
