"use client";

import React from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiCalendar,
  FiDollarSign,
  FiTag,
  FiType,
  FiX,
} from "react-icons/fi";
import { TransactionModalProps } from "@/features/finance/types/FinanceTypes";

const AddTransactionModal: React.FC<TransactionModalProps> = ({
  setIsModalOpen,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#0b1219] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Add transaction</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-white/20 hover:text-white transition-colors cursor-pointer"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form content */}
        <div className="p-6 space-y-6">
          {/* Expenses / Income */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-bold transition-all hover:bg-rose-500/20">
              <FiArrowUp /> Expenses
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 text-white/40 font-bold transition-all hover:bg-white/10">
              <FiArrowDown /> Income
            </button>
          </div>

          {/* Amount input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">
              Sum
            </label>
            <div className="relative">
              <FiDollarSign
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#38CA6B]"
                size={20}
              />
              <input
                type="number"
                placeholder="0.00"
                className="w-full bg-[#14202D] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-2xl font-bold text-white focus:outline-none focus:border-[#38CA6B]/50 transition-all placeholder:text-white/10"
              />
            </div>
          </div>

          {/* Name / desc */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">
              Name
            </label>
            <div className="relative">
              <FiType className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                type="text"
                placeholder="Example: Grocery"
                className="w-full bg-[#14202D] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>

          {/* Date and categories */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">
                Date
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="date"
                  className="w-full bg-[#14202D] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all "
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">
                Categories
              </label>
              <div className="relative">
                <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <select className="w-full bg-[#14202D] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none">
                  <option>Entertainment</option>
                  <option>Food</option>
                  <option>Housing</option>
                  <option>Transportation</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer  */}
        <div className="p-6 bg-white/[0.02] border-t border-white/5 flex gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex-1 py-3 rounded-xl border border-white/5 text-white/60 font-semibold hover:bg-white/5 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button className="flex-1 py-3 rounded-xl bg-[#4F46E5] text-white font-semibold hover:bg-[#4338CA] shadow-lg shadow-indigo-500/20 transition-all">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
