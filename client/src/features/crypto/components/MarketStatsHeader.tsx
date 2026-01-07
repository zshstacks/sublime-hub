import {FiBarChart2, FiZap, FiActivity, FiGlobe} from "react-icons/fi";

export const MarketStatsHeader = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        {[
            { label: "Market Cap", val: "$2.41T", change: "+1.2%", icon: <FiGlobe /> },
            { label: "24h Volume", val: "$82.1B", change: "-5.4%", icon: <FiBarChart2 /> },
            { label: "BTC Dominance", val: "52.4%", change: "+0.2%", icon: <FiZap /> },
            { label: "ETH Gas", val: "12 Gwei", change: "Low", icon: <FiActivity /> },
        ].map((stat, i) => (
            <div key={i} className="bg-[#14202D]/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-indigo-400">
                    {stat.icon}
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-white">{stat.val}</span>
                        <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-[#38CA6B]' : 'text-rose-500'}`}>
                    {stat.change}
                </span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);