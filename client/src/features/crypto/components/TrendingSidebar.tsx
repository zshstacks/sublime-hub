import React from "react";
import { FiTrendingUp, FiZap, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

interface TrendingSidebarProps {
  title: string;
  type: "trending" | "gainers";
}

const data = {
  trending: [
    {
      name: "Solana",
      symbol: "SOL",
      price: "$145.20",
      change: "+5.8%",
      color: "text-[#38CA6B]",
    },
    {
      name: "Pepe",
      symbol: "PEPE",
      price: "$0.000008",
      change: "+12.4%",
      color: "text-[#38CA6B]",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: "$0.452",
      change: "-0.5%",
      color: "text-rose-500",
    },
  ],
  gainers: [
    {
      name: "Bonk",
      symbol: "BONK",
      price: "$0.00002",
      change: "+45.2%",
      color: "text-[#38CA6B]",
    },
    {
      name: "Jupiter",
      symbol: "JUP",
      price: "$1.20",
      change: "+18.1%",
      color: "text-[#38CA6B]",
    },
    {
      name: "Render",
      symbol: "RNDR",
      price: "$11.40",
      change: "+14.5%",
      color: "text-[#38CA6B]",
    },
  ],
};

export const TrendingSidebar = ({ title, type }: TrendingSidebarProps) => {
  const currentData = data[type];

  return (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
        {type === "trending" ? (
          <FiZap className="text-amber-400" />
        ) : (
          <FiTrendingUp className="text-[#38CA6B]" />
        )}
        {title}
      </h3>

      <div className="space-y-5">
        {currentData.map((coin) => (
          <div
            key={coin.symbol}
            className="flex justify-between items-center group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold text-white group-hover:bg-[#38CA6B]/20 group-hover:text-[#38CA6B] transition-all">
                {coin.symbol[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-[#38CA6B] transition-colors">
                  {coin.name}
                </p>
                <p className="text-[10px] text-white/20 uppercase font-bold tracking-tighter">
                  {coin.symbol}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-white font-mono">
                {coin.price}
              </p>
              <p className={`text-[10px] font-bold ${coin.color}`}>
                {coin.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link href="/hub/crypto/explorer">
        <button className="w-full mt-6 py-2.5 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-[#38CA6B]/10 hover:text-[#38CA6B] hover:border-[#38CA6B]/20 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-inner">
          View More{" "}
          <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </Link>
    </div>
  );
};
