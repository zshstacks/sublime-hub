"use client";

import React, { useState } from "react";
import {
  FiMessageSquare,
  FiTerminal,
  FiGitCommit,
  FiGithub,
  FiArrowRight,
  FiCpu,
  FiHeart,
  FiActivity,
  FiTrendingUp,
  FiServer,
  FiDollarSign,
  FiFilter,
  FiChevronRight,
  FiClock,
  FiCode,
  FiZap,
} from "react-icons/fi";

const DashboardView = () => {
  const [selectedModule, setSelectedModule] = useState("all");

  const supporters = [
    "zshstacks",
    "zshstacks",
    "zshstacks",
    "zshstacks",
    "zshstacks",
    "zshstacks",
    "zshstacks",
    "zshstacks",
  ];

  const modules = [
    { id: "all", name: "All Updates", icon: FiActivity },
    { id: "uptime", name: "Uptime Monitor", icon: FiServer },
    { id: "crypto", name: "Crypto Tracker", icon: FiDollarSign },
    { id: "core", name: "Core System", icon: FiCpu },
  ];

  const updates = [
    {
      id: 1,
      date: "2026-01-08",
      version: "v1.0.4",
      module: "core",
      title: "Kernel Optimization & UI Overhaul",
      description:
        "Major update to the UI engine with custom Tailwind-based animation system. Performance increased by 40% on mobile devices. Refactored component architecture for better maintainability.",
      tags: ["Refactor", "UI/UX", "Performance"],
      status: "latest",
      commits: 23,
      filesChanged: 47,
    },
    {
      id: 2,
      date: "2026-01-07",
      version: "v1.0.3",
      module: "crypto",
      title: "WebSocket Optimization for Crypto Feed",
      description:
        "Implemented connection pooling and automatic reconnection logic for Binance WebSocket API. Reduced memory usage by 35% and improved price update latency.",
      tags: ["WebSockets", "Optimization", "Crypto"],
      status: "stable",
      commits: 12,
      filesChanged: 18,
    },
    {
      id: 3,
      date: "2026-01-05",
      version: "v1.0.2",
      module: "uptime",
      title: "Uptime Guard Integration",
      description:
        "Initial module for server monitoring is now live. WebSocket support added for real-time latency tracking. Dashboard now displays live heartbeat status.",
      tags: ["Feature", "Monitoring", "WebSockets"],
      status: "stable",
      commits: 31,
      filesChanged: 52,
    },
    {
      id: 4,
      date: "2026-01-03",
      version: "v1.0.1",
      module: "crypto",
      title: "Framer Motion Price Animations",
      description:
        "Added smooth price transition animations using Framer Motion. Implemented color-coded price changes (green for up, red for down).",
      tags: ["UI/UX", "Animation"],
      status: "stable",
      commits: 8,
      filesChanged: 15,
    },
  ];

  const stats = [
    {
      label: "Total Commits",
      value: "74",
      icon: FiGitCommit,
      color: "text-blue-400",
    },
    {
      label: "Active Modules",
      value: "2",
      icon: FiActivity,
      color: "text-[#38CA6B]",
    },
    {
      label: "Last Deploy",
      value: "2h ago",
      icon: FiClock,
      color: "text-purple-400",
    },
    { label: "Uptime", value: "99.9%", icon: FiZap, color: "text-yellow-400" },
  ];

  const filteredUpdates =
    selectedModule === "all"
      ? updates
      : updates.filter((update) => update.module === selectedModule);

  const getTagColor = (tag: string) => {
    const colors = {
      Refactor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      "UI/UX": "bg-blue-500/10 text-blue-400 border-blue-500/20",
      Performance: "bg-[#38CA6B]/10 text-[#38CA6B] border-[#38CA6B]/20",
      WebSockets: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      Optimization: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      Crypto: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      Feature: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      Monitoring: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      Animation: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    };
    return colors[tag] || "bg-white/10 text-white/60 border-white/20";
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 lg:space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* HERO WELCOME */}
      <section className="relative overflow-hidden rounded-3xl sm:rounded-[3rem] bg-gradient-to-br from-[#38CA6B]/20 via-[#07141b] to-[#07141b] border border-[#38CA6B]/20 p-6 sm:p-8 lg:p-12">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-[#38CA6B] text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-3 sm:mb-4">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38CA6B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#38CA6B]"></span>
            </span>
            System Online // Session: Active
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-4 sm:mb-6 leading-none">
            Welcome back, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              Commander.
            </span>
          </h1>
          <p className="text-white/50 text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-6 sm:mb-8">
            SublimeHub is evolving. You are currently running the unstable
            build. Check the dev logs below for the latest kernel updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="bg-[#38CA6B] text-[#07141b] px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:scale-105 transition-all w-full sm:w-auto">
              Quick Start
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all w-full sm:w-auto">
              Documentation
            </button>
          </div>
        </div>

        <FiCpu className="absolute -right-8 sm:-right-10 -bottom-8 sm:-bottom-10 text-[#38CA6B]/5 w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rotate-12" />
      </section>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white/[0.02] border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-[#38CA6B]/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`${stat.color} w-5 h-5 sm:w-6 sm:h-6`} />
              <span className="text-[8px] sm:text-[9px] font-mono text-white/30 uppercase">
                Live
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black mb-1">
              {stat.value}
            </div>
            <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider font-bold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* DEV UPDATES BLOCK - REDESIGNED */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Header with Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
            <h3 className="font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/60 flex items-center gap-2">
              <FiMessageSquare className="text-[#38CA6B] w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Developer Changelog
            </h3>
            <div className="flex items-center gap-2">
              <FiFilter className="text-white/30 w-3.5 h-3.5" />
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                {modules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <button
                      key={module.id}
                      onClick={() => setSelectedModule(module.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                        selectedModule === module.id
                          ? "bg-[#38CA6B] text-[#07141b]"
                          : "bg-white/5 text-white/40 hover:bg-white/10"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {module.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Updates Timeline */}
          <div className="space-y-3 sm:space-y-4">
            {filteredUpdates.map((update, idx) => (
              <div
                key={update.id}
                className="group relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl hover:border-[#38CA6B]/30 transition-all hover:shadow-lg hover:shadow-[#38CA6B]/5"
              >
                {/* Status Badge */}
                {update.status === "latest" && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#38CA6B] to-emerald-400 text-[#07141b] px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                    ✦ Latest
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#38CA6B] font-bold">
                        {update.date}
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/40">
                        {update.version}
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-black mb-2 uppercase tracking-tight group-hover:text-[#38CA6B] transition-colors">
                      {update.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 text-white/20 flex-shrink-0">
                    <FiGitCommit className="w-5 h-5 group-hover:text-[#38CA6B] transition-colors" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4">
                  {update.description}
                </p>

                {/* Stats & Tags */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex gap-2 flex-wrap">
                    {update.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`text-[8px] sm:text-[9px] font-black px-2.5 py-1 rounded-md uppercase border ${getTagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-[9px] sm:text-[10px] font-mono text-white/30">
                    <span className="flex items-center gap-1">
                      <FiGitCommit className="w-3 h-3" />
                      {update.commits} commits
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCode className="w-3 h-3" />
                      {update.filesChanged} files
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <button className="w-full bg-white/[0.02] border border-white/5 hover:border-[#38CA6B]/30 p-4 rounded-xl sm:rounded-2xl transition-all group">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-[#38CA6B] flex items-center justify-center gap-2">
              View All Updates
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        <div className="lg:col-span-4 space-y-6 sm:space-y-8">
          {/* SUPPORTERS TICKER */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden py-4 sm:py-6 relative">
            <div className="flex items-center gap-2 px-4 sm:px-5 mb-3 sm:mb-4 text-[#38CA6B]">
              <FiHeart size={12} className="sm:w-3.5 sm:h-3.5 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                Top Supporters
              </span>
            </div>

            <div className="relative border-y border-white/5 bg-white/[0.01] overflow-hidden">
              <div className="animate-ticker py-3 sm:py-4">
                {[...supporters, ...supporters].map((nickname, i) => (
                  <span
                    key={i}
                    className="mx-4 sm:mx-6 text-[10px] sm:text-[11px] font-mono font-bold text-white/30 hover:text-[#38CA6B] transition-colors cursor-default uppercase tracking-wider sm:tracking-widest"
                  >
                    {nickname}
                  </span>
                ))}
              </div>

              <div className="absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-[#07141b] to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-[#07141b] to-transparent z-10" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-3">
            <h4 className="font-black text-xs uppercase tracking-wider text-white/60 mb-4">
              Quick Actions
            </h4>

            <button className="w-full flex items-center justify-between bg-white/[0.02] border border-white/5 hover:border-[#38CA6B]/30 p-3 sm:p-4 rounded-xl group transition-all">
              <div className="flex items-center gap-3">
                <FiServer className="text-blue-400 w-4 h-4" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Monitor Status
                </span>
              </div>
              <FiChevronRight className="text-white/20 group-hover:translate-x-1 transition-transform w-4 h-4" />
            </button>

            <button className="w-full flex items-center justify-between bg-white/[0.02] border border-white/5 hover:border-[#38CA6B]/30 p-3 sm:p-4 rounded-xl group transition-all">
              <div className="flex items-center gap-3">
                <FiDollarSign className="text-yellow-400 w-4 h-4" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Crypto Markets
                </span>
              </div>
              <FiChevronRight className="text-white/20 group-hover:translate-x-1 transition-transform w-4 h-4" />
            </button>
          </div>

          {/* Social / Support Box */}
          <div className="bg-gradient-to-b from-[#38CA6B]/10 to-transparent border border-[#38CA6B]/20 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8">
            <FiTerminal className="text-[#38CA6B] mb-3 sm:mb-4 w-5 h-5 sm:w-6 sm:h-6" />
            <h4 className="font-black text-base sm:text-lg uppercase tracking-tighter mb-2">
              Need help?
            </h4>
            <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6">
              Join the community or report bugs directly to my GitHub.
            </p>
            <a
              href="https://github.com/zshstacks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-[#07141b] border border-white/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl group hover:border-[#38CA6B]/50 transition-all"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <FiGithub className="text-white/40 group-hover:text-white w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest truncate">
                  GitHub Issues
                </span>
              </div>
              <FiArrowRight className="text-white/20 group-hover:translate-x-1 transition-transform w-4 h-4 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          display: inline-flex;
          animation: ticker 30s linear infinite;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default DashboardView;
