import {
  FiArrowDownLeft,
  FiDollarSign,
  FiMoreHorizontal,
} from "react-icons/fi";

interface TransactionProps {
  name: string;
  date: string;
  category: string;
  amount: number;
  type: string;
}

export const TransactionItem = ({
  name,
  date,
  category,
  amount,
  type,
}: TransactionProps) => {
  const isIncome = type === "income";

  return (
    <div className="group flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.05] hover:border-[#38CA6B]/30 rounded-2xl transition-all duration-300 cursor-pointer ">
      <div className="flex items-center gap-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center border border-white/5 shadow-inner ${
            isIncome
              ? "bg-[#38CA6B]/10 text-[#38CA6B]"
              : "bg-white/5 text-white/40"
          }`}
        >
          {isIncome ? (
            <FiArrowDownLeft size={20} />
          ) : (
            <FiDollarSign size={20} />
          )}
        </div>
        <div>
          <div className="text-sm font-bold text-white group-hover:text-[#38CA6B] transition-colors">
            {name}
          </div>
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">
            {date} <span className="mx-1 text-white/5">•</span> {category}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div
          className={`text-sm font-mono font-bold ${isIncome ? "text-[#38CA6B]" : "text-rose-500"}`}
        >
          {isIncome ? "+" : "-"}${Math.abs(amount).toLocaleString()}
        </div>
        <button className="p-1 text-white/10 group-hover:text-white/40 transition-colors cursor-pointer">
          <FiMoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};
