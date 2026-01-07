import { FiPieChart } from "react-icons/fi";
import Link from "next/link";

const categories = [
  { name: "Shopping", perc: 45, color: "bg-indigo-500" },
  { name: "Food & Drinks", perc: 28, color: "bg-[#38CA6B]" },
  { name: "Rent", perc: 15, color: "bg-orange-400" },
];

export const SpendingCategories = () => {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
        <FiPieChart className="text-[#38CA6B]" /> Spending Categories
      </h3>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.name} className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-white/60">{cat.name}</span>
              <span className="text-white font-bold font-mono">
                {cat.perc}%
              </span>
            </div>

            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
              <div
                className={`${cat.color} h-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(56,202,107,0.1)]`}
                style={{ width: `${cat.perc}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Link href="/hub/finance/insights">
        <button className="w-full mt-8 py-2.5 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-[#38CA6B]/10 hover:text-[#38CA6B] hover:border-[#38CA6B]/20 transition-all cursor-pointer shadow-sm active:scale-[0.98]">
          View all insights
        </button>
      </Link>
    </div>
  );
};
