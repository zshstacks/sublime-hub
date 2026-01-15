import {
  FiMoreVertical,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiActivity,
} from "react-icons/fi";
import { StatItem } from "./StatItem";
import { StatsSidebarProps } from "@/features/monitor/types";
import { useMemo } from "react";

export const StatsSidebar = ({ monitors }: StatsSidebarProps) => {
  const stats = useMemo(() => {
    const total = monitors.length;
    const up = monitors.filter((m) => m.status === "up").length;
    const down = monitors.filter((m) => m.status === "down").length;

    //overall health
    const health = total > 0 ? (up / total) * 100 : 100;

    return { total, up, down, health };
  }, [monitors]);

  return (
    <div className="w-full lg:w-[320px] flex flex-col gap-6 sticky top-8">
      <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#38CA6B]/10 rounded-full blur-3xl" />

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#38CA6B]/10 rounded-lg">
            <FiShield className="text-[#38CA6B]" size={20} />
          </div>
          <h3 className="text-white font-bold text-lg tracking-tight">
            System Overview
          </h3>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">
              System Health
            </span>
            <span
              className={`text-2xl font-mono font-bold ${stats.health > 90 ? "text-[#38CA6B]" : "text-rose-500"}`}
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
            icon={<FiAlertCircle size={12} />}
          />
          <StatBox
            label="Up"
            value={stats.up}
            color="text-[#38CA6B]"
            icon={<FiCheckCircle size={12} />}
          />
          <StatBox
            label="All"
            value={stats.total}
            color="text-white/40"
            icon={<FiActivity size={12} />}
          />
        </div>
      </div>

      <div className="bg-[#101923] border border-white/5 rounded-3xl p-5">
        <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
          Quick Insights
        </h4>
        <div className="space-y-4">
          {stats.down > 0 ? (
            <div className="flex gap-3 items-start p-3 bg-rose-500/5 rounded-xl border border-rose-500/10">
              <FiAlertCircle className="text-rose-500 mt-0.5" size={16} />
              <p className="text-[11px] text-white/60 leading-relaxed">
                <span className="text-rose-500 font-bold">
                  {stats.down} service(s)
                </span>{" "}
                currently experiencing downtime. Check monitor details for
                latency spikes.
              </p>
            </div>
          ) : (
            <div className="flex gap-3 items-start p-3 bg-[#38CA6B]/5 rounded-xl border border-[#38CA6B]/10">
              <FiCheckCircle className="text-[#38CA6B] mt-0.5" size={16} />
              <p className="text-[11px] text-white/60 leading-relaxed">
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
  <div className="bg-white/5 border border-white/5 p-3 rounded-2xl flex flex-col items-center gap-1">
    <div className={`flex items-center gap-1.5 ${color}`}>
      {icon}
      <span className="text-sm font-black font-mono">{value}</span>
    </div>
    <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">
      {label}
    </span>
  </div>
);

// {
//   /* Last 24 Hours Box */
// }
// <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
//   <div className="flex justify-between items-center mb-6">
//     <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
//       <FiClock className="text-amber-400" /> Last 24 hours
//     </h3>
//     <FiMoreVertical className="text-white/10 cursor-pointer hover:text-white transition-colors" />
//   </div>
//   <div className="grid grid-cols-2 gap-y-8">
//     <StatItem
//       label="Overall uptime"
//       value="98.9%"
//       color="text-[#38CA6B]"
//       align="text-left"
//     />
//     <StatItem
//       label="Incidents"
//       value="1"
//       align="text-right"
//       color="text-rose-500"
//     />
//     <StatItem label="Without incid." value="23h, 44m" align="text-left" />
//     <StatItem label="Affected mon." value="1" align="text-right" />
//   </div>
// </div>;
