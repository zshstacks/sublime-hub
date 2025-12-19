import { FiMoreVertical } from "react-icons/fi";

export const MonitorCard = () => {
  return (
    <div className="bg-[#14202D]/40 border border-white/5 rounded-xl p-5 flex items-center justify-between group hover:bg-[#14202D]/60 transition-all cursor-pointer">
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-[#38CA6B]" />
          <div className="absolute inset-0 w-4 h-4 rounded-full bg-[#38CA6B] animate-ping opacity-20" />
        </div>
        <div>
          <div className="font-semibold text-base text-white">youtube.com</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-black bg-white/5 px-1.5 py-0.5 rounded text-white/40 tracking-wider">
              HTTP
            </span>
            <span className="text-xs text-white/30">Up 9 hr, 2 min</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col items-end">
          <div className="flex gap-0.5 mb-1.5">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className={`w-[3px] h-4 rounded-full ${i > 20 ? "bg-[#38CA6B]/20" : "bg-[#38CA6B]"}`}
              />
            ))}
          </div>
          <div className="text-[11px] font-medium text-white/40">98.913%</div>
        </div>
        <button className="text-white/20 hover:text-white transition-colors p-1">
          <FiMoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};
