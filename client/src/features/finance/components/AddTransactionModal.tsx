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

export const AddTransactionModal: React.FC<TransactionModalProps> = ({
  setIsModalOpen,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-[#0b1219] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Add transaction</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-white/20 hover:text-white transition-colors cursor-pointer"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-bold transition-all hover:bg-rose-500/20 cursor-pointer">
              <FiArrowUp /> Expenses
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#38CA6B]/10 border border-[#38CA6B]/20 text-[#38CA6B] font-bold transition-all hover:bg-[#38CA6B]/20 cursor-pointer">
              <FiArrowDown /> Income
            </button>
          </div>

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
                className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-2xl font-bold text-white focus:outline-none focus:border-[#38CA6B]/50 transition-all placeholder:text-white/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">
              Name
            </label>
            <div className="relative">
              <FiType className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                type="text"
                placeholder="Example: Grocery"
                className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">
                Date
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">
                Categories
              </label>
              <div className="relative">
                <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <select className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/50 transition-all appearance-none cursor-pointer">
                  <option>Entertainment</option>
                  <option>Food</option>
                  <option>Housing</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/[0.02] border-t border-white/5 flex gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex-1 py-3 rounded-xl border border-white/5 text-white/60 font-bold hover:bg-white/5 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button className="flex-1 py-3 rounded-xl bg-[#38CA6B] text-white font-bold hover:bg-[#2fb15d] shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer">
            Save Transaction
          </button>
        </div>
      </div>
    </div>
  );
};
