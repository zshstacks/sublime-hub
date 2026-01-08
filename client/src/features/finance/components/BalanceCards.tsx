import { FiArrowDownLeft, FiArrowUpRight, FiCreditCard } from "react-icons/fi";
import React from "react";

export const BalanceCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
    {/* Total Balance  */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-xl">
      <div className="absolute -top-2 -right-2 p-4 opacity-5 text-white">
        <FiCreditCard size={100} />
      </div>
      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
        Total Balance
      </p>
      <h2 className="text-3xl font-bold text-white mt-2 tracking-tight">
        $12,450.80
      </h2>
      <div className="flex items-center gap-1 text-[#38CA6B] text-[11px] font-bold mt-4 bg-[#38CA6B]/10 w-fit px-2 py-0.5 rounded-lg">
        <FiArrowUpRight /> +4.5%
      </div>
    </div>

    {/* Monthly Income */}
    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-[#38CA6B]/20 transition-colors shadow-xl">
      <div className="flex items-center gap-3 mb-4 text-[#38CA6B]">
        <div className="p-2 bg-[#38CA6B]/10 rounded-lg">
          <FiArrowDownLeft size={20} />
        </div>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
          Monthly Income
        </p>
      </div>
      <h2 className="text-2xl font-bold text-white tracking-tight">
        $4,200.00
      </h2>
    </div>

    {/* Monthly Expenses */}
    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-rose-500/20 transition-colors shadow-xl">
      <div className="flex items-center gap-3 mb-4 text-rose-500">
        <div className="p-2 bg-rose-500/10 rounded-lg">
          <FiArrowUpRight size={20} />
        </div>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
          Monthly Expenses
        </p>
      </div>
      <h2 className="text-2xl font-bold text-white tracking-tight">
        $1,840.25
      </h2>
    </div>
  </div>
);
