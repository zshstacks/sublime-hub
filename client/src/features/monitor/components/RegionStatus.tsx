import React from "react";
import { FiGlobe } from "react-icons/fi";

export const RegionStatus = () => {
  const regions = [
    { name: "Frankfurt, DE", lat: "12ms", status: "ok", flag: "🇪🇺" },
    { name: "New York, US", lat: "84ms", status: "ok", flag: "🇺🇸" },
    { name: "London, UK", lat: "18ms", status: "ok", flag: "🇬🇧" },
    { name: "Singapore, SG", lat: "180ms", status: "warn", flag: "🇸🇬" },
    { name: "Tokyo, JP", lat: "210ms", status: "error", flag: "🇯🇵" },
  ];

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 backdrop-blur-md">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
        <FiGlobe className="text-[#38CA6B]" /> Global Reach
      </h3>
      <div className="space-y-4">
        {regions.map((r, i) => (
          <div key={i} className="flex justify-between items-center group">
            <div className="flex items-center gap-3">
              <span className="text-base grayscale group-hover:grayscale-0 transition-all">
                {r.flag}
              </span>
              <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">
                {r.name}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] font-bold text-white/20">
                {r.lat}
              </span>
              <div className="relative">
                <div
                  className={`w-2 h-2 rounded-full ${
                    r.status === "ok"
                      ? "bg-[#38CA6B]"
                      : r.status === "warn"
                        ? "bg-amber-500"
                        : "bg-rose-500"
                  }`}
                />
                {r.status !== "ok" && (
                  <div
                    className={`absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-40 ${
                      r.status === "warn" ? "bg-amber-500" : "bg-rose-500"
                    }`}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-[#38CA6B] hover:border-[#38CA6B]/20 transition-all cursor-pointer">
        Refresh Regions
      </button>
    </div>
  );
};
