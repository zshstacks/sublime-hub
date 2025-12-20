import { FiPieChart } from "react-icons/fi";
import Link from "next/link";

const categories = [
  { name: "Shopping", perc: 45, color: "bg-indigo-500" },
  { name: "Food & Drinks", perc: 28, color: "bg-[#38CA6B]" },
  { name: "Rent", perc: 15, color: "bg-orange-400" },
];

export const SpendingCategories = () => {
  return (
    <div className="bg-[#14202D]/60 border border-white/5 rounded-2xl p-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
        <FiPieChart className="text-indigo-500" /> Spending Categories
      </h3>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.name} className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/60">{cat.name}</span>
              <span className="text-white font-bold">{cat.perc}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`${cat.color} h-full`}
                style={{ width: `${cat.perc}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <Link href="/hub/finance/insights">
        <button className="w-full mt-8 py-2 border border-white/5 rounded-xl text-xs text-white/40 hover:bg-white/5 transition-all cursor-pointer">
          View all insights
        </button>
      </Link>
    </div>
  );
};
