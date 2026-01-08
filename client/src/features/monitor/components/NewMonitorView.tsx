"use client";

import React from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiGlobe,
  FiClock,
  FiBell,
  FiShield,
  FiActivity,
  FiChevronDown,
} from "react-icons/fi";

const NewMonitorView = () => {
  return (
    <div className="w-full min-h-full p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      {/* Top Navigation */}
      <div className="flex items-center gap-6">
        <Link href="/hub/monitor">
          <button className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer group w-fit">
            <FiArrowLeft size={18} className="text-[#38CA6B]" />
          </button>
        </Link>

        <div>
          <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
            <FiActivity size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Configuration
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Create New Monitor
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form Area */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* General Settings Card */}
          <div className="bg-white/5 border border-white/5 rounded-3xl p-8 shadow-2xl space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="p-2 bg-[#38CA6B]/10 rounded-lg text-[#38CA6B]">
                <FiGlobe size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Target Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
                  Monitor Type
                </label>
                <div className="relative">
                  <select className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-4 text-sm text-white appearance-none focus:outline-none focus:border-[#38CA6B]/30 cursor-pointer">
                    <option>HTTP(s)</option>
                    <option>TCP Port</option>
                    <option>Ping (ICMP)</option>
                    <option>DNS</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
                  Friendly Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. My Main API"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
                  URL / Hostname
                </label>
                <input
                  type="text"
                  placeholder="https://api.example.com"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all font-mono"
                />
              </div>
            </div>
          </div>

          {/* Monitoring Intervals Card */}
          <div className="bg-white/5 border border-white/5 rounded-3xl p-8 shadow-2xl space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400">
                <FiClock size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">
                Heartbeat Interval
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60 font-medium">
                  Frequency:{" "}
                  <span className="text-[#38CA6B]">Every 60 seconds</span>
                </span>
                <span className="text-[10px] font-mono text-white/20">
                  Optimal for high availability
                </span>
              </div>
              <input
                type="range"
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#38CA6B]"
              />
              <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-tighter">
                <span>20s</span>
                <span>1 min</span>
                <span>5 min</span>
                <span>10 min</span>
                <span>30 min</span>
                <span>1 hour</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Options */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Notifications Card */}
          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
              <FiBell className="text-rose-500" /> Notifications
            </h3>

            <div className="space-y-3">
              {[
                { label: "Email Alerts", enabled: true },
                { label: "Discord Webhook", enabled: false },
                { label: "Slack Integration", enabled: false },
              ].map((notif, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl"
                >
                  <span className="text-sm text-white/60">{notif.label}</span>
                  <div
                    className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${notif.enabled ? "bg-[#38CA6B]" : "bg-white/10"}`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${notif.enabled ? "left-6" : "left-1"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Info Card */}
          <div className="bg-[#38CA6B]/5 border border-[#38CA6B]/10 rounded-3xl p-6">
            <div className="flex items-center gap-2 text-[#38CA6B] mb-3">
              <FiShield size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Verification
              </span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              We will verify the SSL certificate and check the response status
              code. Monitors are executed from 3 different global regions.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <button className="w-full bg-[#38CA6B] hover:bg-[#2fb15d] py-4 rounded-2xl font-bold text-white shadow-lg shadow-[#38CA6B]/20 transition-all active:scale-95 flex items-center justify-center gap-2">
              Start Monitoring
            </button>
            <Link href="/hub/monitor">
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/5 py-4 rounded-2xl font-bold text-white/40 hover:text-white transition-all">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMonitorView;
