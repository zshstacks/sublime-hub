"use client";

import React from "react";
import {
  FiArrowLeft,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiGlobe,
} from "react-icons/fi";
import { LiveCoinTable } from "@/features/crypto/components/LiveCoinTable";
import Link from "next/link";

const MarketExplorerView = () => {
  return (
    <div className="w-full min-h-full p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      {/* Top Navigation & Title */}
      <div className="flex items-center gap-6">
        <Link href="/hub/crypto">
          <button className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer group w-fit">
            <FiArrowLeft size={18} className=" text-[#38CA6B]" />
          </button>
        </Link>

        <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
              <FiGlobe size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Asset Explorer
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              All Market Assets
            </h1>
            <p className="text-white/40 text-sm mt-2 font-medium">
              Browse over 5,000+ cryptocurrencies by market cap and volume.
            </p>
          </div>

          <div className="flex justify-between gap-3 w-fit h-fit">
            {/* Segmented Control  */}
            <div className="bg-white/5 border border-white/5 p-1 rounded-xl flex">
              <button className="px-4 py-1.5 bg-[#38CA6B] text-white text-[10px] font-bold uppercase rounded-lg shadow-lg transition-all">
                All
              </button>
              <button className="px-4 py-1.5 text-white/40 hover:text-white text-[10px] font-bold uppercase rounded-lg transition-all">
                Top Gainers
              </button>
              <button className="px-4 py-1.5 text-white/40 hover:text-white text-[10px] font-bold uppercase rounded-lg transition-all">
                New
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
          <input
            type="text"
            placeholder="Search by name, symbol or address..."
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all"
          />
        </div>
        <div className="relative">
          <select className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-[#38CA6B]/30 cursor-pointer">
            <option>Category: All Assets</option>
            <option>Layer 1 Networks</option>
            <option>DeFi Ecosystem</option>
            <option>Gaming & NFT</option>
          </select>
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl py-3.5 px-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all">
          <FiFilter className="text-[#38CA6B]" /> More Filters
        </button>
      </div>

      {/* Main Full-Width Table Container */}
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-2 shadow-2xl">
        <LiveCoinTable />

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-8 border-t border-white/5 mt-4">
          <p className="text-xs text-white/20 font-mono">
            Showing{" "}
            <span className="text-[#38CA6B] font-bold font-sans">1-50</span> of{" "}
            <span className="text-white/60 font-bold font-sans">10,245</span>{" "}
            assets
          </p>

          <div className="flex items-center gap-2">
            <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white/40 hover:text-[#38CA6B] transition-all disabled:opacity-50">
              <FiChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, "...", 124].map((page, i) => (
                <button
                  key={i}
                  className={`w-10 h-10 rounded-xl text-[10px] font-bold transition-all ${
                    page === 1
                      ? "bg-[#38CA6B] text-white shadow-lg shadow-[#38CA6B]/20"
                      : "text-white/40 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white/40 hover:text-[#38CA6B] transition-all">
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketExplorerView;
