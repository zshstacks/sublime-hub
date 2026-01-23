import { FiMoreVertical, FiExternalLink } from "react-icons/fi";
import { MonitorCardProps } from "@/features/monitor/types";
import { useMemo } from "react";

export const MonitorCard = ({ monitor }: MonitorCardProps) => {
  const isUp = monitor.status === "up";

  const heartbeats = monitor.heartbeats
    ? [...monitor.heartbeats].slice(0, 24).reverse()
    : [];

  const stability = useMemo(() => {
    if (heartbeats.length === 0) return 100;

    const successCount = heartbeats.filter(
      (hb: any) => hb.status_code >= 200 && hb.status_code < 300,
    ).length;

    return (successCount / heartbeats.length) * 100;
  }, [heartbeats]);

  return (
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between group hover:bg-white/[0.05] hover:border-[#38CA6B]/20 transition-all duration-300 cursor-pointer gap-3 sm:gap-5">
      {/* Left Section: Status + Info */}
      <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto min-w-0">
        <div className="relative flex-shrink-0">
          <div
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ${isUp ? "bg-[#38CA6B] shadow-[0_0_12px_#38CA6B]" : "bg-rose-500 shadow-[0_0_12px_#f43f5e]"}`}
          />
          {isUp && (
            <div className="absolute inset-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#38CA6B] animate-ping opacity-20" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="font-bold text-sm sm:text-base text-white group-hover:text-[#38CA6B] transition-colors tracking-tight truncate">
              {monitor.name}
            </div>
            <a
              href={monitor.url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-shrink-0"
            >
              <FiExternalLink
                size={11}
                className="sm:w-3 sm:h-3 text-white/10 group-hover:text-white/30"
              />
            </a>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-[8px] sm:text-[9px] font-black bg-white/5 px-1.5 sm:px-2 py-0.5 rounded border border-white/5 text-white/40 tracking-[0.1em] uppercase">
              {monitor.type || "HTTP"}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-white/20 truncate">
              {isUp ? "System operational" : "Service outage"}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Heartbeats + Stability */}
      <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex flex-col items-start sm:items-end flex-1 sm:flex-initial">
          {/* Heartbeat bars */}
          <div className="flex gap-[2px] sm:gap-[3px] mb-1.5 sm:mb-2 h-4 sm:h-5 items-end">
            {heartbeats.length === 0
              ? [...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] sm:w-[4px] h-2.5 sm:h-3 bg-white/5 rounded-full"
                  />
                ))
              : heartbeats.map((hb: any, i: number) => {
                  const success = hb.status_code >= 200 && hb.status_code < 300;
                  return (
                    <div
                      key={hb.id || i}
                      title={`Status: ${hb.status_code} | Latency: ${hb.latency}ms`}
                      className={`w-[3px] sm:w-[4px] rounded-full transition-all duration-500 group-hover:scale-y-110 ${
                        success
                          ? "h-4 sm:h-5 bg-[#38CA6B] shadow-[0_0_8px_rgba(56,202,107,0.2)]"
                          : "h-2.5 sm:h-3 bg-rose-500/40"
                      }`}
                    />
                  );
                })}
          </div>
          <div className="text-[9px] sm:text-[10px] font-mono font-bold text-white/20 uppercase tracking-tighter">
            Stability:{" "}
            <span
              className={stability > 99 ? "text-[#38CA6B]" : "text-rose-500"}
            >
              {stability.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
