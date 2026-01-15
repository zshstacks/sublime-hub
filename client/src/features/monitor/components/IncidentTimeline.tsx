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
      <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-10 text-center">
        <FiClock className="mx-auto text-white/10 mb-3" size={24} />
        <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
          No events recorded yet
        </p>
      </div>
    );
  }

  const sortedHeartbeats = [...heartbeats].sort(
    (a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime(),
  );

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
          Live Heartbeats
        </h3>
        <span className="text-[9px] text-white/20 font-mono bg-white/5 px-2 py-1 rounded-lg">
          {heartbeats.length} checks
        </span>
      </div>

      <div className="max-h-[280px] overflow-y-auto pr-2 custom-scrollbar space-y-0">
        {sortedHeartbeats.map((hb, i) => {
          const isUp = hb.status_code >= 200 && hb.status_code < 300;
          const timeLabel = format(new Date(hb.CreatedAt), "MMM d, HH:mm:ss");
          const timeAgo = formatDistanceToNow(new Date(hb.CreatedAt), {
            addSuffix: true,
          });

          return (
            <div
              key={hb.ID}
              className="relative flex gap-6 pb-6 last:pb-0 group"
            >
              {/* Timeline Line */}
              {i !== sortedHeartbeats.length - 1 && (
                <div className="absolute left-[11px] top-6 w-[1px] h-full bg-white/5 group-hover:bg-[#38CA6B]/20 transition-colors" />
              )}

              {/* Status Icon */}
              <div
                className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-4 border-[#0B121A] transition-transform group-hover:scale-110 shrink-0 ${
                  isUp
                    ? "bg-[#38CA6B] text-[#0B121A]"
                    : "bg-rose-500 text-white"
                }`}
              >
                {isUp ? (
                  <FiCheckCircle size={10} />
                ) : (
                  <FiAlertCircle size={10} />
                )}
              </div>

              {/* Content Card */}
              <div className="flex-1 flex justify-between items-center bg-white/[0.01] hover:bg-white/[0.03] border border-transparent hover:border-white/5 rounded-2xl p-3 -mt-2 transition-all">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white tracking-tight">
                      {isUp ? "Healthy Check" : "Service Issue"}
                    </span>
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded border font-mono ${
                        isUp
                          ? "border-[#38CA6B]/20 text-[#38CA6B]"
                          : "border-rose-500/20 text-rose-500"
                      }`}
                    >
                      {hb.status_code}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/30 mt-0.5">
                    Latency:{" "}
                    <span className="text-white/60 font-mono">
                      {hb.latency.toFixed(2)}ms
                    </span>
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-mono font-bold text-white/60">
                    {timeLabel}
                  </div>
                  <div className="text-[9px] uppercase font-bold text-white/10 mt-1">
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
