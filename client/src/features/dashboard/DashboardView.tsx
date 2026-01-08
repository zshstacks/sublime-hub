"use client";

import React from "react";
import {
  FiMessageSquare,
  FiTerminal,
  FiGitCommit,
  FiGithub,
  FiArrowRight,
  FiCpu,
  FiActivity,
  FiGlobe,
  FiHeart,
} from "react-icons/fi";

const DashboardView = () => {
  const supporters = [
    "zshstacks",
    "RefactorKing",
    "ShadowDev",
    "KernelPanic",
    "LogicMaster",
    "WebWizard",
    "StackOverlord",
    "GoGuru",
    "NextJsNinja",
    "Rustacean",
    "OdinExplorer",
  ];

  return (
    <div className="flex-1 p-6 lg:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* HERO WELCOME  */}
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#38CA6B]/20 via-[#07141b] to-[#07141b] border border-[#38CA6B]/20 p-8 lg:p-12">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-[#38CA6B] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38CA6B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38CA6B]"></span>
            </span>
            System Online // Session: Active
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6 leading-none">
            Welcome back, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              Commander.
            </span>
          </h1>
          <p className="text-white/50 text-lg font-medium leading-relaxed mb-8">
            SublimeHub is evolving. You are currently running the unstable
            build. Check the dev logs below for the latest kernel updates.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#38CA6B] text-[#07141b] px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
              Quick Start
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
              Documentation
            </button>
          </div>
        </div>

        {/* Abstract Background Icon */}
        <FiCpu className="absolute -right-10 -bottom-10 text-[#38CA6B]/5 w-64 h-64 rotate-12" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/*  DEV UPDATES BLOCK */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-xs uppercase tracking-[0.3em] text-white/60 flex items-center gap-2">
              <FiMessageSquare className="text-[#38CA6B]" /> Developer Updates
            </h3>
          </div>

          <div className="space-y-4">
            {/* Update 1 */}
            <div className="group bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] hover:border-[#38CA6B]/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-mono text-[#38CA6B]">
                  2026-01-08 // v1.0.4
                </span>
                <FiGitCommit className="text-white/10 group-hover:text-[#38CA6B] transition-colors" />
              </div>
              <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">
                Kernel Optimization & UI Overhaul
              </h4>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                I've just pushed a massive update to the UI engine.
                Transitioning from standard CSS to a custom Tailwind-based
                animation system. Performance increased by 40% on mobile
                devices.
              </p>
              <div className="flex gap-2">
                <span className="text-[9px] font-black px-2 py-1 bg-[#38CA6B]/10 text-[#38CA6B] rounded uppercase">
                  Refactor
                </span>
                <span className="text-[9px] font-black px-2 py-1 bg-blue-500/10 text-blue-400 rounded uppercase">
                  UI/UX
                </span>
              </div>
            </div>

            {/* Update 2 */}
            <div className="group bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] hover:border-[#38CA6B]/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-mono text-white/20">
                  2026-01-05 // v1.0.2
                </span>
                <FiGitCommit className="text-white/10" />
              </div>
              <h4 className="text-xl font-bold mb-2 uppercase tracking-tight text-white/60">
                Uptime Guard Integration
              </h4>
              <p className="text-white/30 text-sm leading-relaxed">
                Initial module for server monitoring is now live. WebSocket
                support added for real-time latency tracking.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* SUPPORTERS TICKER */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden py-6 relative">
            <div className="flex items-center gap-2 px-5 mb-4 text-[#38CA6B]">
              <FiHeart size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Top Supporters
              </span>
            </div>

            <div className="relative border-y border-white/5 bg-white/[0.01] overflow-hidden">
              <div className="animate-ticker py-4">
                {[...supporters, ...supporters].map((nickname, i) => (
                  <span
                    key={i}
                    className="mx-6 text-[11px] font-mono font-bold text-white/30 hover:text-[#38CA6B] transition-colors cursor-default uppercase tracking-widest"
                  >
                    {nickname}
                  </span>
                ))}
              </div>

              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#07141b] to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#07141b] to-transparent z-10" />
            </div>
          </div>

          {/* Social / Support Box */}
          <div className="bg-gradient-to-b from-[#38CA6B]/10 to-transparent border border-[#38CA6B]/20 rounded-[2.5rem] p-8">
            <FiTerminal className="text-[#38CA6B] mb-4" size={24} />
            <h4 className="font-black text-lg uppercase tracking-tighter mb-2">
              Need help?
            </h4>
            <p className="text-white/50 text-sm mb-6">
              Join the community or report bugs directly to my GitHub.
            </p>
            <a
              href="https://github.com/zshstacks"
              target="_blank"
              className="flex items-center justify-between w-full bg-[#07141b] border border-white/10 p-4 rounded-2xl group hover:border-[#38CA6B]/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <FiGithub className="text-white/40 group-hover:text-white" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  GitHub Issues
                </span>
              </div>
              <FiArrowRight className="text-white/20 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
