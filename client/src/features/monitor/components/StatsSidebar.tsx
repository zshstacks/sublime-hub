import { FiMoreVertical, FiShield, FiClock } from "react-icons/fi";
import { StatItem } from "./StatItem";

export const StatsSidebar = () => {
  return (
    <div className="w-full lg:w-[320px] flex flex-col gap-6">
      {/* Current Status Box */}
      <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
          <FiShield className="text-[#38CA6B]" /> Current status
        </h3>
        <div className="flex justify-center mb-8">
          <div className="relative flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-[#38CA6B]/10 flex items-center justify-center animate-pulse">
              <div className="w-10 h-10 rounded-full bg-[#38CA6B]/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#38CA6B] shadow-[0_0_20px_#38CA6B]" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 bg-white/5 p-4 rounded-2xl border border-white/5">
          <StatItem label="Down" value="0" color="text-rose-500" />
          <StatItem label="Up" value="1" color="text-[#38CA6B]" />
          <StatItem label="Paused" value="0" color="text-white/20" />
        </div>
        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-[11px] text-white/20 font-bold uppercase tracking-tighter">
            Using <span className="text-[#38CA6B]">1 of 50</span> monitors
          </p>
        </div>
      </div>

      {/* Last 24 Hours Box */}
      <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
            <FiClock className="text-amber-400" /> Last 24 hours
          </h3>
          <FiMoreVertical className="text-white/10 cursor-pointer hover:text-white transition-colors" />
        </div>
        <div className="grid grid-cols-2 gap-y-8">
          <StatItem
            label="Overall uptime"
            value="98.9%"
            color="text-[#38CA6B]"
            align="text-left"
          />
          <StatItem
            label="Incidents"
            value="1"
            align="text-right"
            color="text-rose-500"
          />
          <StatItem label="Without incid." value="23h, 44m" align="text-left" />
          <StatItem label="Affected mon." value="1" align="text-right" />
        </div>
      </div>
    </div>
  );
};
