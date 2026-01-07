"use client";

import React from "react";
import {
  FiArrowLeft,
  FiCoffee,
  FiHome,
  FiShoppingBag,
  FiTarget,
  FiTrendingUp,
  FiZap,
  FiActivity,
  FiBarChart2,
} from "react-icons/fi";
import Link from "next/link";

const FinanceInsightsView = () => {
  return (
    <div className="w-full min-h-full p-8 flex flex-col gap-8 animate-in fade-in duration-700 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      {/* Header */}
      <div className="flex items-center gap-5">
        <Link href="/hub/finance">
          <button className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer group w-fit">
            <FiArrowLeft size={18} className=" text-[#38CA6B]" />
          </button>
        </Link>
        <div>
          <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
            <FiActivity size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Financial Analytics
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Portfolio Insights
          </h1>
          <p className="text-white/40 text-sm mt-1 font-medium">
            Monthly performance and spending habits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Spending Trend (Main Chart) */}
        <div className="lg:col-span-8 bg-white/[0.03] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                <FiBarChart2 className="text-[#38CA6B]" /> Spending Trend
              </h3>
              <div className="text-2xl font-mono font-bold text-white mt-1">
                $4,820.00
              </div>
            </div>
            <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
              <button className="px-4 py-1.5 text-[10px] font-bold uppercase bg-[#38CA6B] text-white rounded-lg shadow-lg">
                Week
              </button>
              <button className="px-4 py-1.5 text-[10px] font-bold uppercase text-white/30 hover:text-white transition-all">
                Month
              </button>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-1.5">
            {[40, 70, 45, 90, 65, 80, 50, 85, 40, 75, 60, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-3 group"
              >
                <div
                  style={{ height: `${h}%` }}
                  className="w-full bg-[#38CA6B]/10 group-hover:bg-[#38CA6B]/30 border-t-2 border-transparent group-hover:border-[#38CA6B] transition-all rounded-sm relative"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#38CA6B] text-white text-[10px] font-mono font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl border border-white/10">
                    ${h * 10}
                  </div>
                </div>
                <span className="text-[9px] font-bold text-white/10 uppercase font-mono">
                  D{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insight Cards */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-[#38CA6B]/10 to-transparent border border-[#38CA6B]/20 rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center gap-3 text-[#38CA6B] mb-4">
              <div className="p-2 bg-[#38CA6B]/10 rounded-lg">
                <FiZap size={18} />
              </div>
              <h3 className="font-bold text-[10px] uppercase tracking-[0.2em]">
                Savings Hint
              </h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Spent <span className="text-[#38CA6B] font-bold">12% less</span>{" "}
              in <span className="text-white">Groceries</span> than last month.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
            <div className="flex items-center gap-3 text-orange-400 mb-4">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <FiTrendingUp size={18} />
              </div>
              <h3 className="font-bold text-[10px] uppercase tracking-[0.2em]">
                Budget Alert
              </h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Entertainment exceeded budget by{" "}
              <span className="text-rose-500 font-bold">$45.00</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <FiShoppingBag />,
            name: "Shopping",
            val: "$1,240",
            perc: 45,
            color: "text-blue-400",
          },
          {
            icon: <FiCoffee />,
            name: "Food & Drinks",
            val: "$420",
            perc: 15,
            color: "text-orange-400",
          },
          {
            icon: <FiHome />,
            name: "Housing",
            val: "$950",
            perc: 35,
            color: "text-[#38CA6B]",
          },
          {
            icon: <FiTarget />,
            name: "Others",
            val: "$120",
            perc: 5,
            color: "text-purple-400",
          },
        ].map((cat, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/5 rounded-2xl p-6 group hover:bg-white/[0.08] transition-all"
          >
            <div className="flex justify-between items-center mb-6">
              <div className={`p-3 bg-white/5 rounded-xl ${cat.color}`}>
                {cat.icon}
              </div>
              <span className="text-xs font-mono font-bold text-white/20">
                {cat.perc}%
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">
              {cat.name}
            </p>
            <div className="text-2xl font-bold text-white tracking-tight">
              {cat.val}
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full mt-6 overflow-hidden">
              <div
                className="h-full bg-[#38CA6B] opacity-60"
                style={{ width: `${cat.perc}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Smart Tip Section */}
      <div className="w-full bg-gradient-to-r from-[#38CA6B]/10 via-white/5 to-white/5 border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-[#38CA6B]/10 border border-[#38CA6B]/20 rounded-2xl flex items-center justify-center text-[#38CA6B] shadow-inner">
            <FiTarget size={28} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">
              Optimize Your Monthly Limit
            </h4>
            <p className="text-white/40 text-sm">
              Save up to <span className="text-[#38CA6B] font-bold">$200</span>{" "}
              by enabling smart thresholds.
            </p>
          </div>
        </div>
        <button className="w-full md:w-auto px-8 py-3 bg-[#38CA6B] text-white font-bold rounded-xl hover:bg-[#2fb15d] transition-all shadow-lg active:scale-95 cursor-pointer">
          Enable Smart Tracker
        </button>
      </div>
    </div>
  );
};

export default FinanceInsightsView;
