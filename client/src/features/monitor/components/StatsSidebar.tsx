import {
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiActivity,
} from "react-icons/fi";

import { StatsSidebarProps } from "@/features/monitor/types";
import { useMemo } from "react";

export const StatsSidebar = ({ monitors }: StatsSidebarProps) => {
  const stats = useMemo(() => {
    const total = monitors.length;
    const up = monitors.filter((m) => m.status === "up").length;
    const down = monitors.filter((m) => m.status === "down").length;

    const health = total > 0 ? (up / total) * 100 : 100;

    return { total, up, down, health };
  }, [monitors]);

  return (
    <div className="w-full xl:w-[320px] flex flex-col gap-4 sm:gap-6 xl:sticky xl:top-8">
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-20 h-20 sm:w-24 sm:h-24 bg-[#38CA6B]/10 rounded-full blur-3xl" />

        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-1.5 sm:p-2 bg-[#38CA6B]/10 rounded-lg">
            <FiShield className="text-[#38CA6B] w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
            System Overview
          </h3>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] sm:text-[11px] font-bold text-white/30 uppercase tracking-wider sm:tracking-widest">
              System Health
            </span>
            <span
              className={`text-xl sm:text-2xl font-mono font-bold ${stats.health > 90 ? "text-[#38CA6B]" : "text-rose-500"}`}
            >
              {stats.health.toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-out ${stats.health > 90 ? "bg-[#38CA6B]" : "bg-rose-500"}`}
              style={{ width: `${stats.health}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <StatBox
            label="Down"
            value={stats.down}
            color="text-rose-500"
            icon={<FiAlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          />
          <StatBox
            label="Up"
            value={stats.up}
            color="text-[#38CA6B]"
            icon={<FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          />
          <StatBox
            label="All"
            value={stats.total}
            color="text-white/40"
            icon={<FiActivity className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          />
        </div>
      </div>

      <div className="bg-[#101923] border border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-5">
        <h4 className="text-white/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.2em] mb-3 sm:mb-4">
          Quick Insights
        </h4>
        <div className="space-y-3 sm:space-y-4">
          {stats.down > 0 ? (
            <div className="flex gap-2 sm:gap-3 items-start p-2.5 sm:p-3 bg-rose-500/5 rounded-lg sm:rounded-xl border border-rose-500/10">
              <FiAlertCircle className="text-rose-500 mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <p className="text-[10px] sm:text-[11px] text-white/60 leading-relaxed">
                <span className="text-rose-500 font-bold">
                  {stats.down} service(s)
                </span>{" "}
                currently experiencing downtime. Check monitor details for
                latency spikes.
              </p>
            </div>
          ) : (
            <div className="flex gap-2 sm:gap-3 items-start p-2.5 sm:p-3 bg-[#38CA6B]/5 rounded-lg sm:rounded-xl border border-[#38CA6B]/10">
              <FiCheckCircle className="text-[#38CA6B] mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <p className="text-[10px] sm:text-[11px] text-white/60 leading-relaxed">
                All systems are performing within normal parameters. No recent
                incidents detected.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatBox = ({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white/5 border border-white/5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex flex-col items-center gap-0.5 sm:gap-1">
    <div className={`flex items-center gap-1 sm:gap-1.5 ${color}`}>
      {icon}
      <span className="text-sm sm:text-base font-black font-mono">{value}</span>
    </div>
    <span className="text-[8px] sm:text-[9px] font-bold text-white/20 uppercase tracking-tighter">
      {label}
    </span>
  </div>
);
