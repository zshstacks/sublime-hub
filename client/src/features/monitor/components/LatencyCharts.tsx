import React from "react";
import { FiActivity } from "react-icons/fi";

export const LatencyCharts = () => {
  const data = [
    120, 135, 128, 150, 210, 140, 130, 125, 160, 145, 190, 130, 120, 115, 140,
    155, 130, 145, 120, 110,
  ];
  const maxVal = Math.max(...data);

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
            <FiActivity className="text-[#38CA6B]" /> Response Time
          </h3>
          <div className="text-2xl font-mono font-bold text-white mt-1">
            124<span className="text-xs text-[#38CA6B] ml-1 uppercase">ms</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-white/20 uppercase">
            Avg. 24h
          </span>
          <span className="text-sm font-mono font-bold text-white/60">
            142ms
          </span>
        </div>
      </div>

      {/* Chart Visualizer */}
      <div className="h-32 flex items-end gap-1.5 px-2">
        {data.map((ms, i) => {
          const heightPerc = (ms / maxVal) * 100;
          return (
            <div
              key={i}
              className="flex-1 bg-white/5 hover:bg-[#38CA6B]/30 transition-all rounded-t-sm relative group cursor-crosshair"
              style={{ height: `${heightPerc}%` }}
            >
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0B121A] border border-white/10 px-2 py-1 rounded text-[10px] font-mono font-bold text-[#38CA6B] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl">
                {ms}ms
              </div>
              {/* Pulse effect for the latest data point */}
              {i === data.length - 1 && (
                <div className="absolute -top-1 left-0 w-full h-1 bg-[#38CA6B] shadow-[0_0_10px_#38CA6B]" />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-4 text-[9px] font-bold uppercase tracking-widest text-white/10">
        <span>30 minutes ago</span>
        <span>Just now</span>
      </div>
    </div>
  );
};
