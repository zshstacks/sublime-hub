"use client";

import React from "react";
import { FiTrendingUp, FiZap, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Coin } from "@/features/crypto/types";
import { useCryptoWebSocket } from "../hooks/useCryptoWebSocket";

interface TrendingSidebarProps {
  title: string;
  type: "trending" | "gainers";
  data: Coin[];
}

export const TrendingSidebar = ({
  title,
  type,
  data,
}: TrendingSidebarProps) => {
  const { trendingLoading } = useSelector((state: RootState) => state.crypto);

  const liveCoins = useCryptoWebSocket(data);

  if (trendingLoading && liveCoins.length === 0) {
    return (
      <div className="bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl animate-pulse">
        <div className="h-4 w-24 bg-white/10 rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-white/5 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (liveCoins.length === 0) return null;

  return (
    <div className="bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:border-white/10 transition-all">
      <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/30 mb-4 sm:mb-6 flex items-center gap-2">
        {type === "trending" ? (
          <FiZap className="text-amber-400" />
        ) : (
          <FiTrendingUp className="text-[#38CA6B]" />
        )}
        {title}
      </h3>

      <div className="space-y-4 sm:space-y-5">
        {liveCoins.slice(0, 3).map((coin) => {
          const isPositive = coin.h24?.startsWith("+");
          return (
            <div
              key={`${type}-${coin.symbol}`}
              className="flex justify-between items-center group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold text-white group-hover:bg-[#38CA6B]/20 transition-colors">
                  {coin.symbol ? coin.symbol[0] : "?"}
                </div>
                <div className="truncate">
                  <p className="text-xs sm:text-sm font-bold text-white group-hover:text-[#38CA6B] transition-colors truncate">
                    {coin.name}
                  </p>
                  <p className="text-[9px] text-white/20 uppercase font-bold">
                    {coin.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right ml-2">
                <p className="text-xs sm:text-sm font-bold text-white font-mono">
                  {coin.price || "---"}
                </p>
                <p
                  className={`text-[9px] font-bold ${isPositive ? "text-[#38CA6B]" : "text-rose-500"}`}
                >
                  {coin.h24 || "0.00%"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Link href="/hub/crypto/explorer">
        <button className="w-full mt-6 py-2.5 border border-white/5 rounded-xl text-[9px] font-bold uppercase tracking-widest text-white/40 hover:bg-[#38CA6B]/10 hover:text-[#38CA6B] transition-all flex items-center justify-center gap-2 group cursor-pointer">
          View More{" "}
          <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </Link>
    </div>
  );
};
