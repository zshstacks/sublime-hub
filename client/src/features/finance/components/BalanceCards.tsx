import { FiArrowDownLeft, FiArrowUpRight, FiCreditCard } from "react-icons/fi";
import React from "react";

export const BalanceCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
    {/* Total Balance */}
    <div className="bg-gradient-to-br from-[#1E293B] to-[#14202D] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <FiCreditCard size={80} />
      </div>
      <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
        Total Balance
      </p>
      <h2 className="text-3xl font-bold text-white mt-2">$12,450.80</h2>
      <div className="flex items-center gap-1 text-[#38CA6B] text-xs font-medium mt-4">
        <FiArrowUpRight /> +4.5% this month
      </div>
    </div>

    {/* Monthly Income */}
    <div className="bg-[#14202D]/40 border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4 text-[#38CA6B]">
        <div className="p-2 bg-[#38CA6B]/10 rounded-lg">
          <FiArrowDownLeft size={20} />
        </div>
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
          Monthly Income
        </p>
      </div>
      <h2 className="text-2xl font-bold text-white">$4,200.00</h2>
    </div>

    {/* Monthly Expenses */}
    <div className="bg-[#14202D]/40 border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4 text-rose-500">
        <div className="p-2 bg-rose-500/10 rounded-lg">
          <FiArrowUpRight size={20} />
        </div>
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
          Monthly Expenses
        </p>
      </div>
      <h2 className="text-2xl font-bold text-white">$1,840.25</h2>
    </div>
  </div>
);
