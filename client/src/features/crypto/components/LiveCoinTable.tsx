"use client";

import React from "react";
import {
  FiStar,
  FiTrendingUp,
  FiTrendingDown,
  FiMoreHorizontal,
} from "react-icons/fi";

interface Coin {
  rank: number;
  name: string;
  symbol: string;
  price: string;
  cap: string;
  h24: string;
  d7?: string;
}

interface LiveCoinTableProps {
  data?: Coin[];
}

const defaultCoins: Coin[] = [
  {
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: "$64,230.50",
    cap: "$1.2T",
    h24: "+2.4%",
  },
  {
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: "$2,450.10",
    cap: "$294B",
    h24: "-1.2%",
  },
  {
    rank: 3,
    name: "Solana",
    symbol: "SOL",
    price: "$145.20",
    cap: "$64B",
    h24: "+5.8%",
  },
  {
    rank: 4,
    name: "Cardano",
    symbol: "ADA",
    price: "$0.452",
    cap: "$16B",
    h24: "-0.5%",
  },
];

export const LiveCoinTable = ({ data = defaultCoins }: LiveCoinTableProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-12 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 border-b border-white/5">
        <div className="col-span-1 flex items-center">#</div>
        <div className="col-span-4">Coin</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">24h %</div>
        <div className="col-span-2 text-right hidden md:block">Market Cap</div>
        <div className="col-span-1 text-right"></div>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        {data.map((coin) => {
          const isPositive = coin.h24.startsWith("+");
          return (
            <div
              key={coin.symbol}
              className="grid grid-cols-12 px-6 py-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.02] hover:border-[#38CA6B]/20 rounded-2xl items-center transition-all duration-200 group cursor-pointer shadow-sm"
            >
              <div className="col-span-1 flex items-center gap-3">
                <span className="text-xs font-mono text-white/20 group-hover:text-[#38CA6B] transition-colors">
                  {coin.rank}
                </span>
                <FiStar
                  className="text-white/10 hover:text-amber-400 transition-colors hidden sm:block"
                  size={14}
                />
              </div>

              <div className="col-span-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                  {coin.symbol[0]}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white group-hover:text-[#38CA6B] transition-colors leading-none">
                    {coin.name}
                  </span>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider mt-1">
                    {coin.symbol}
                  </span>
                </div>
              </div>

              <div className="col-span-2 text-right">
                <span className="text-sm font-bold text-white font-mono tracking-tight">
                  {coin.price}
                </span>
              </div>

              <div
                className={`col-span-2 text-right text-sm font-bold ${isPositive ? "text-[#38CA6B]" : "text-rose-500"}`}
              >
                <div className="flex items-center justify-end gap-1.5">
                  {isPositive ? (
                    <FiTrendingUp size={14} />
                  ) : (
                    <FiTrendingDown size={14} />
                  )}
                  {coin.h24}
                </div>
              </div>

              <div className="col-span-2 text-right hidden md:block text-sm font-medium text-white/40">
                {coin.cap}
              </div>

              <div className="col-span-1 text-right flex justify-end text-white/10 group-hover:text-white/40 transition-colors">
                <FiMoreHorizontal size={18} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
