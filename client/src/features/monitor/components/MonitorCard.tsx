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
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 flex items-center justify-between group hover:bg-white/[0.05] hover:border-[#38CA6B]/20 transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-5">
        <div className="relative">
          <div
            className={`w-3.5 h-3.5 rounded-full ${isUp ? "bg-[#38CA6B] shadow-[0_0_12px_#38CA6B]" : "bg-rose-500 shadow-[0_0_12px_#f43f5e]"}`}
          />
          {isUp && (
            <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-[#38CA6B] animate-ping opacity-20" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="font-bold text-base text-white group-hover:text-[#38CA6B] transition-colors tracking-tight">
              {monitor.name}
            </div>
            <a
              href={monitor.url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink
                size={12}
                className="text-white/10 group-hover:text-white/30"
              />
            </a>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] font-black bg-white/5 px-2 py-0.5 rounded border border-white/5 text-white/40 tracking-[0.1em] uppercase">
              {monitor.type || "HTTP"}
            </span>
            <span className="text-[11px] font-medium text-white/20">
              {isUp ? "System operational" : "Service outage"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col items-end">
          {/* dynamic uptime */}
          <div className="flex gap-[3px] mb-2 h-5 items-end">
            {heartbeats.length === 0
              ? [...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[4px] h-3 bg-white/5 rounded-full"
                  />
                ))
              : heartbeats.map((hb: any, i: number) => {
                  const success = hb.status_code >= 200 && hb.status_code < 300;
                  return (
                    <div
                      key={hb.id || i}
                      title={`Status: ${hb.status_code} | Latency: ${hb.latency}ms`}
                      className={`w-[4px] rounded-full transition-all duration-500 group-hover:scale-y-110 ${
                        success
                          ? "h-5 bg-[#38CA6B] shadow-[0_0_8px_rgba(56,202,107,0.2)]"
                          : "h-3 bg-rose-500/40"
                      }`}
                    />
                  );
                })}
          </div>
          <div className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-tighter">
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
