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
} from "react-icons/fi";
import Link from "next/link";

const FinanceInsightsView = () => {
  return (
    <div className="w-full min-h-full p-8 flex flex-col gap-8 animate-in fade-in  duration-500">
      {/* Back & Title */}
      <div className="flex items-center gap-4">
        <Link href="/hub/finance">
          <button className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-all cursor-pointer">
            <FiArrowLeft size={24} />
          </button>
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-white">Financial Insights</h1>
          <p className="text-white/40 text-sm font-medium">December, 2025</p>
        </div>
      </div>

      {/* Main Row: Large Analytics Containers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Trend (Bar Chart Simulation) */}
        <div className="lg:col-span-2 bg-[#14202D]/40 border border-white/5 rounded-3xl p-8">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-lg font-bold text-white">Spending Trend</h3>
            <div className="flex bg-black/20 p-1 rounded-lg">
              <button className="px-3 py-1 text-xs bg-[#4F46E5] text-white rounded-md">
                Week
              </button>
              <button className="px-3 py-1 text-xs text-white/40 hover:text-white transition-all">
                Month
              </button>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50, 85, 40, 75, 60, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-2 group"
              >
                <div
                  style={{ height: `${h}%` }}
                  className="w-full bg-indigo-500/20 group-hover:bg-indigo-500 transition-all rounded-t-sm relative"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${h * 10}
                  </div>
                </div>
                <span className="text-[10px] text-white/20 font-mono">
                  D{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Quick Insights */}
        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-indigo-500/20 to-transparent border border-indigo-500/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 text-indigo-400 mb-4">
              <FiZap size={20} />
              <h3 className="font-bold text-sm uppercase tracking-wider">
                Savings Hint
              </h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Great news! This month you've spent{" "}
              <span className="text-white font-bold">12% less</span> in the
              "Groceries" category compared to last month.
            </p>
          </div>

          <div className="bg-[#14202D]/40 border border-white/5 rounded-3xl p-6">
            <div className="flex items-center gap-3 text-orange-400 mb-4">
              <FiTrendingUp size={20} />
              <h3 className="font-bold text-sm uppercase tracking-wider">
                Budget Alert
              </h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your spending in "Entertainment" has exceeded your set budget by{" "}
              <span className="text-white font-bold">$45.00</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Category Detail Cards */}
        {[
          {
            icon: <FiShoppingBag />,
            name: "Shopping",
            color: "bg-blue-500",
            val: "$1,240",
            perc: 45,
          },
          {
            icon: <FiCoffee />,
            name: "Food & Drinks",
            color: "bg-orange-500",
            val: "$420",
            perc: 15,
          },
          {
            icon: <FiHome />,
            name: "Housing",
            color: "bg-[#38CA6B]",
            val: "$950",
            perc: 35,
          },
          {
            icon: <FiTarget />,
            name: "Others",
            color: "bg-purple-500",
            val: "$120",
            perc: 5,
          },
        ].map((cat, i) => (
          <div
            key={i}
            className="bg-[#14202D]/40 border border-white/5 rounded-2xl p-5 group hover:border-white/10 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${cat.color}/10 text-white`}>
                {cat.icon}
              </div>
              <span className="text-white font-bold">{cat.perc}%</span>
            </div>
            <h4 className="text-white/40 text-xs font-bold uppercase mb-1">
              {cat.name}
            </h4>
            <div className="text-xl font-bold text-white">{cat.val}</div>
            <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
              <div
                className={`${cat.color} h-full`}
                style={{ width: `${cat.perc}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Smart Tip Section */}
      <div className="w-full bg-[#14202D]/20 border border-dashed border-white/10 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/40">
            <FiTarget size={24} />
          </div>
          <div>
            <h4 className="text-white font-medium">Set a Monthly Limit</h4>
            <p className="text-white/40 text-sm">
              Automatic tracking could help you save up to $200 per month.
            </p>
          </div>
        </div>
        <button className="px-6 py-2 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all">
          Set Now
        </button>
      </div>
    </div>
  );
};

export default FinanceInsightsView;
