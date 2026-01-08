import { FiMoreVertical, FiExternalLink } from "react-icons/fi";

export const MonitorCard = () => {
  return (
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 flex items-center justify-between group hover:bg-white/[0.05] hover:border-[#38CA6B]/20 transition-all duration-300 cursor-pointer ">
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-3.5 h-3.5 rounded-full bg-[#38CA6B] shadow-[0_0_12px_#38CA6B]" />
          <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-[#38CA6B] animate-ping opacity-20" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="font-bold text-base text-white group-hover:text-[#38CA6B] transition-colors tracking-tight">
              youtube.com
            </div>
            <FiExternalLink
              size={12}
              className="text-white/10 group-hover:text-white/30"
            />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] font-black bg-white/5 px-2 py-0.5 rounded border border-white/5 text-white/40 tracking-[0.1em]">
              HTTP (S)
            </span>
            <span className="text-[11px] font-medium text-white/20">
              Up 9 hr, 2 min
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col items-end">
          {/* Uptime Visualizer */}
          <div className="flex gap-[3px] mb-2">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className={`w-[4px] h-5 rounded-full transition-all duration-500 ${
                  i > 20
                    ? "bg-rose-500/20"
                    : "bg-[#38CA6B] shadow-[0_0_8px_rgba(56,202,107,0.2)]"
                } group-hover:scale-y-110`}
              />
            ))}
          </div>
          <div className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-tighter">
            Stability: <span className="text-white/60">98.913%</span>
          </div>
        </div>
        <button className="text-white/10 hover:text-white transition-colors p-2 bg-white/5 rounded-lg border border-white/5">
          <FiMoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};
