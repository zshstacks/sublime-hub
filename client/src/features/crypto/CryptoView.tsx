"use client";

import React from "react";
import { FiSearch, FiFilter, FiActivity, FiGlobe } from "react-icons/fi";
import { MarketStatsHeader } from "./components/MarketStatsHeader";
import { LiveCoinTable } from "./components/LiveCoinTable";
import { TrendingSidebar } from "./components/TrendingSidebar";

const CryptoView = () => {
  return (
    <div className="w-full min-h-full p-8 flex flex-col gap-8 animate-in fade-in duration-500 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <div>
          <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
            <FiGlobe size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Live Market Data
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Market Overview
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Real-time tracking of the top cryptocurrencies by market cap
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
            <input
              type="text"
              placeholder="Search coin..."
              className="bg-white/5 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/50 transition-all w-64 shadow-inner"
            />
          </div>
          <button className="bg-white/5 hover:bg-white/10 border border-white/5 px-4 py-2.5 rounded-xl flex items-center gap-2 font-semibold text-white/60 hover:text-white transition-all cursor-pointer">
            <FiFilter className="text-[#38CA6B]" /> Filter
          </button>
        </div>
      </div>

      <MarketStatsHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        <div className="lg:col-span-9 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
              <FiActivity className="text-[#38CA6B]" /> Live Rankings
            </h3>
            <span className="text-[10px] text-white/20 font-mono">
              Last update: Just now
            </span>
          </div>
          <LiveCoinTable />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <TrendingSidebar title="Trending" type="trending" />
          <TrendingSidebar title="Top Gainers" type="gainers" />
        </div>
      </div>
    </div>
  );
};

export default CryptoView;
