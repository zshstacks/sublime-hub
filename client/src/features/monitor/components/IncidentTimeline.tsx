import React from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export const IncidentTimeline = () => {
  const events = [
    {
      status: "up",
      time: "Jan 8, 00:04",
      duration: "9h 2m",
      msg: "Service is reachable",
      code: "200 OK",
    },
    {
      status: "down",
      time: "Jan 7, 23:58",
      duration: "6m",
      msg: "Connection Timeout",
      code: "504",
    },
    {
      status: "up",
      time: "Jan 7, 14:20",
      duration: "1d 4h",
      msg: "Service is reachable",
      code: "200 OK",
    },
    {
      status: "down",
      time: "Jan 7, 14:15",
      duration: "5m",
      msg: "Bad Gateway",
      code: "502",
    },
  ];

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">
        Event Log
      </h3>
      <div className="space-y-0">
        {events.map((event, i) => (
          <div key={i} className="relative flex gap-6 pb-8 last:pb-0 group">
            {/* Timeline Line */}
            {i !== events.length - 1 && (
              <div className="absolute left-[11px] top-6 w-[1px] h-full bg-white/5 group-hover:bg-[#38CA6B]/20 transition-colors" />
            )}

            {/* Status Icon */}
            <div
              className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-4 border-[#0B121A] ${
                event.status === "up"
                  ? "bg-[#38CA6B] text-[#0B121A]"
                  : "bg-rose-500 text-white"
              }`}
            >
              {event.status === "up" ? (
                <FiCheckCircle size={12} />
              ) : (
                <FiAlertCircle size={12} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 flex justify-between items-start pt-0.5">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white tracking-tight">
                    {event.status === "up"
                      ? "System Online"
                      : "Outage Detected"}
                  </span>
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${
                      event.status === "up"
                        ? "border-[#38CA6B]/20 text-[#38CA6B]"
                        : "border-rose-500/20 text-rose-500"
                    }`}
                  >
                    {event.code}
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-1">{event.msg}</p>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-mono font-bold text-white/60">
                  {event.time}
                </div>
                <div className="text-[9px] uppercase font-bold text-white/10 mt-1">
                  Duration: {event.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
