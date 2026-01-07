import { FiStar, FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const coins = [
    { rank: 1, name: "Bitcoin", symbol: "BTC", price: "$64,230.50", cap: "$1.2T", h24: "+2.4%", d7: "+5.1%" },
    { rank: 2, name: "Ethereum", symbol: "ETH", price: "$2,450.10", cap: "$294B", h24: "-1.2%", d7: "+2.8%" },
    { rank: 3, name: "Solana", symbol: "SOL", price: "$145.20", cap: "$64B", h24: "+5.8%", d7: "+12.4%" },
    { rank: 4, name: "Cardano", symbol: "ADA", price: "$0.452", cap: "$16B", h24: "-0.5%", d7: "-2.1%" },
];

export const LiveCoinTable = () => (
    <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Coin</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">24h %</div>
            <div className="col-span-3 text-right">Market Cap</div>
        </div>

        {/* Table Rows */}
        {coins.map((coin) => (
            <div
                key={coin.symbol}
                className="grid grid-cols-12 px-6 py-4 bg-[#14202D]/40 border border-white/5 rounded-2xl items-center hover:bg-[#14202D]/80 transition-all cursor-pointer group"
            >
                <div className="col-span-1 text-white/20 text-xs font-mono">{coin.rank}</div>
                <div className="col-span-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white">
                        {coin.symbol[0]}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{coin.name}</div>
                        <div className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">{coin.symbol}</div>
                    </div>
                </div>
                <div className="col-span-2 text-right text-sm font-bold text-white">{coin.price}</div>
                <div className={`col-span-2 text-right text-sm font-bold ${coin.h24.startsWith('+') ? 'text-[#38CA6B]' : 'text-rose-500'}`}>
                    <div className="flex items-center justify-end gap-1">
                        {coin.h24.startsWith('+') ? <FiTrendingUp size={12}/> : <FiTrendingDown size={12}/>}
                        {coin.h24}
                    </div>
                </div>
                <div className="col-span-3 text-right text-sm font-medium text-white/60">{coin.cap}</div>
            </div>
        ))}
    </div>
);