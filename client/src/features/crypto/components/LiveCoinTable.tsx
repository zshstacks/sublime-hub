"use client";

import React from "react";
import { useCryptoWebSocket } from "../hooks/useCryptoWebSocket";
import { FiStar } from "react-icons/fi";
import { Coin } from "../types";
import { PriceCell } from "@/features/crypto/components/PriceCell";

import { PriceChangeCell } from "@/features/crypto/components/PriceChangeCell";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { toggleFavoriteAction } from "@/redux/cryptoSlice/asyncActions";

interface LiveCoinTableProps {
  initialData?: Coin[];
}

export const LiveCoinTable = ({ initialData = [] }: LiveCoinTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const liveCoins = useCryptoWebSocket(initialData);

  const favoriteIds = useSelector((state: RootState) =>
    state.crypto.favorites.map((f: any) => f.id),
  );

  if (liveCoins.length === 0) {
    return (
      <div className="p-8 text-white/20 text-center">No coins found...</div>
    );
  }

  const handleToggleFavorite = (coin: Coin) => {
    if (!coin.id || coin.id === 0) return;
    dispatch(toggleFavoriteAction(coin.id));
  };

  return (
    <div className="flex flex-col w-full">
      {/* Table Header */}
      <div className="grid grid-cols-12 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 border-b border-white/5">
        <div className="col-span-1">#</div>
        <div className="col-span-4">Coin</div>
        <div className="col-span-3 text-right">Price</div>{" "}
        <div className="col-span-2 text-right">24h %</div>
        <div className="col-span-2 text-right hidden md:block">Market Cap</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col gap-1 mt-2 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
        {liveCoins.map((coin, index) => {
          const isFav = favoriteIds.includes(coin.id);

          const changeValue = parseFloat(coin.h24?.replace(/[+%]/g, "") || "0");

          return (
            <div
              key={coin.id || coin.symbol}
              className="grid grid-cols-12 px-6 py-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.02] hover:border-[#38CA6B]/10 rounded-2xl items-center transition-all duration-200 group cursor-pointer shadow-sm"
            >
              {/* Index & Favorite */}
              <div className="col-span-1 flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(coin);
                  }}
                  className={`transition-all duration-200 ${
                    isFav
                      ? "text-yellow-400 scale-110"
                      : "text-white/10 hover:text-white/40"
                  }`}
                >
                  <FiStar size={16} fill={isFav ? "currentColor" : "none"} />
                </button>
                <span className="text-xs font-mono text-white/20 group-hover:text-[#38CA6B]">
                  {index + 1}
                </span>
              </div>

              {/* Asset Info */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center text-xs font-bold text-white uppercase shadow-inner">
                  {coin.symbol[0]}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white group-hover:text-[#38CA6B] transition-colors">
                    {coin.name}
                  </span>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider">
                    {coin.symbol}
                  </span>
                </div>
              </div>

              {/* Price with Pill Styling */}
              <div className="col-span-3 text-right flex justify-end">
                <PriceCell price={coin.price} />
              </div>

              {/* 24h Change Component */}
              <div className="col-span-2">
                <PriceChangeCell value={changeValue} />
              </div>

              {/* Market Cap */}
              <div className="col-span-2 text-right hidden md:block text-sm font-mono font-medium text-white/40">
                {coin.cap || "---"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
