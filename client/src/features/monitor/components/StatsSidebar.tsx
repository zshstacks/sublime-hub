import { FiMoreVertical } from "react-icons/fi";
import { StatItem } from "./StatItem";

export const StatsSidebar = () => {
  return (
    <div className="w-full lg:w-[320px] flex flex-col gap-6">
      {/* Current Status Box */}
      <div className="bg-[#14202D]/80 border border-white/5 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">
          Current status
        </h3>
        <div className="flex justify-center mb-8">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#38CA6B]/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#38CA6B] shadow-[0_0_20px_rgba(56,202,107,0.5)]" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <StatItem label="Down" value="0" />
          <StatItem label="Up" value="1" color="text-white" />
          <StatItem label="Paused" value="0" />
        </div>
        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-[11px] text-white/20 font-medium">
            Using <span className="text-white/60">1 of 50</span> monitors
          </p>
        </div>
      </div>

      {/* Last 24 Hours Box */}
      <div className="bg-[#14202D]/80 border border-white/5 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">
            Last 24 hours
          </h3>
          <FiMoreVertical className="text-white/20 cursor-pointer hover:text-white transition-colors" />
        </div>
        <div className="grid grid-cols-2 gap-y-6">
          <StatItem
            label="Overall uptime"
            value="98.913%"
            color="text-orange-400"
          />
          <StatItem label="Incidents" value="1" align="text-right" />
          <StatItem label="Without incid." value="23h, 44m" />
          <StatItem label="Affected mon." value="1" align="text-right" />
        </div>
      </div>
    </div>
  );
};
