"use client";

import React from "react";
import { RiVisaLine, RiAddLine, RiHistoryLine } from "react-icons/ri";
import { FiCreditCard, FiZap, FiPackage } from "react-icons/fi";

export const BillingView = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Current Plan Card */}
      <section className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#38CA6B]/5 blur-[100px] rounded-full" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#38CA6B]/10 flex items-center justify-center text-[#38CA6B] border border-[#38CA6B]/20">
              <FiPackage size={32} />
            </div>
            <div>
              <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em] mb-1">
                Current Subscription
              </h2>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white tracking-tight">
                  Free Tier
                </span>
                <span className="text-[#38CA6B] text-xs font-bold font-mono">
                  $0.00/mo
                </span>
              </div>
            </div>
          </div>
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all">
            Cancel Plan
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <section className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
              <FiCreditCard className="text-[#38CA6B]" /> Payment Methods
            </h3>
            <button className="p-2 bg-[#38CA6B]/10 text-[#38CA6B] rounded-lg hover:bg-[#38CA6B] hover:text-[#07141b] transition-all cursor-pointer">
              <RiAddLine size={18} />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group hover:border-[#38CA6B]/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-[#14202D] rounded-md flex items-center justify-center text-white/60">
                  <RiVisaLine size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">•••• 4242</p>
                  <p className="text-[10px] text-white/20 font-bold uppercase">
                    Expires 12/26
                  </p>
                </div>
              </div>
              <span className="text-[9px] font-black text-[#38CA6B] uppercase bg-[#38CA6B]/10 px-2 py-1 rounded-md">
                Default
              </span>
            </div>
          </div>
        </section>

        {/* Usage Stats */}
        <section className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
            <FiZap className="text-[#38CA6B]" /> Resource Usage
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                <span className="text-white/40">Uptime Monitors</span>
                <span className="text-white">3 / 5</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#38CA6B] w-[60%] shadow-[0_0_10px_#38CA6B]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                <span className="text-white/40">Crypto Watchlists</span>
                <span className="text-white">8 / 10</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#38CA6B] w-[80%] shadow-[0_0_10px_#38CA6B]" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Invoices Table */}
      <section className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
          <RiHistoryLine className="text-[#38CA6B]" /> Billing History
        </h3>
        <div className="w-full">
          {[
            {
              date: "Oct 12, 2025",
              amount: "$0.00",
              status: "Paid",
              id: "#INV-001",
            },
            {
              date: "Sep 12, 2025",
              amount: "$0.00",
              status: "Paid",
              id: "#INV-002",
            },
          ].map((inv, i) => (
            <div
              key={i}
              className="grid grid-cols-4 py-4 border-b border-white/5 last:border-0 items-center"
            >
              <span className="text-xs font-bold text-white">{inv.date}</span>
              <span className="text-[10px] font-mono text-white/40 uppercase">
                {inv.id}
              </span>
              <span className="text-xs font-black text-white">
                {inv.amount}
              </span>
              <div className="text-right">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#38CA6B] bg-[#38CA6B]/5 px-3 py-1.5 rounded-lg border border-[#38CA6B]/10">
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
