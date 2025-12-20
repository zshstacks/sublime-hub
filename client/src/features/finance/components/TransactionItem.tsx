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
  type: "income" | "expense";
}

export const TransactionItem = ({
  name,
  date,
  category,
  amount,
  type,
}: TransactionProps) => (
  <div className="bg-[#14202D]/40 border border-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-[#14202D]/60 transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${type === "income" ? "bg-[#38CA6B]/10 text-[#38CA6B]" : "bg-indigo-500/10 text-indigo-400"}`}
      >
        {type === "income" ? <FiArrowDownLeft /> : <FiDollarSign />}
      </div>
      <div>
        <div className="text-white font-medium text-sm">{name}</div>
        <div className="text-xs text-white/20">
          {date} • {category}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div
        className={`font-bold text-sm ${type === "income" ? "text-[#38CA6B]" : "text-rose-500"}`}
      >
        {type === "income" ? "+" : "-"}${Math.abs(amount).toFixed(2)}
      </div>
      <FiMoreHorizontal className="text-white/10 group-hover:text-white/40" />
    </div>
  </div>
);
