"use client";

import { useMemo, memo, useCallback } from "react";
import { useCryptoWebSocket } from "../hooks/useCryptoWebSocket";
import { FiStar } from "react-icons/fi";
import { Coin } from "../types";
import { PriceCell } from "@/features/crypto/components/PriceCell";
import { PriceChangeCell } from "@/features/crypto/components/PriceChangeCell";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { toggleFavoriteAction } from "@/redux/cryptoSlice/asyncActions";
import { MarketCapCell } from "@/features/crypto/components/MarketCapCell";

interface LiveCoinTableProps {
  initialData?: Coin[];
}

const CoinRow = memo(
  ({
    coin,
    index,
    isFav,
    onToggleFavorite,
  }: {
    coin: Coin;
    index: number;
    isFav: boolean;
    onToggleFavorite: (coin: Coin) => void;
  }) => {
    const changeValue = parseFloat(coin.h24?.replace(/[+%]/g, "") || "0");

    return (
      <div className="md:grid md:grid-cols-12 flex flex-col px-3 sm:px-6 py-3 sm:py-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.02] hover:border-[#38CA6B]/10 rounded-xl sm:rounded-2xl md:items-center transition-all duration-200 group  shadow-sm gap-3 md:gap-0">
        {/* Mobile Layout */}
        <div className="flex md:hidden justify-between items-start">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(coin);
              }}
              className={`transition-all duration-200 flex-shrink-0 ${
                isFav
                  ? "text-yellow-400 scale-110"
                  : "text-white/10 hover:text-white/40"
              }`}
            >
              <FiStar size={14} fill={isFav ? "currentColor" : "none"} />
            </button>

            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center text-xs font-bold text-white uppercase shadow-inner flex-shrink-0">
              {coin.symbol ? coin.symbol[0] : "?"}
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-bold text-white group-hover:text-[#38CA6B] transition-colors truncate">
                {coin.name}
              </span>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider truncate">
                {coin.symbol}
              </span>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <PriceCell price={coin.price} />
            <div className="mt-1">
              <PriceChangeCell value={changeValue} />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <>
          <div className="hidden md:flex col-span-1 items-center gap-2 sm:gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(coin);
              }}
              className={`transition-all duration-200 cursor-pointer ${
                isFav
                  ? "text-yellow-400 scale-110"
                  : "text-white/10 hover:text-white/40"
              }`}
            >
              <FiStar
                size={14}
                className="sm:w-4 sm:h-4"
                fill={isFav ? "currentColor" : "none"}
              />
            </button>
            <span className="text-xs font-mono text-white/20 group-hover:text-[#38CA6B]">
              {index + 1}
            </span>
          </div>

          <div className="hidden md:flex col-span-4 items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center text-xs font-bold text-white uppercase shadow-inner flex-shrink-0">
              {coin.symbol ? coin.symbol[0] : "?"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-white group-hover:text-[#38CA6B] transition-colors truncate">
                {coin.name}
              </span>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider truncate">
                {coin.symbol}
              </span>
            </div>
          </div>

          <div className="hidden md:flex col-span-3 text-right justify-end">
            <PriceCell price={coin.price} />
          </div>

          <div className="hidden md:block col-span-2">
            <PriceChangeCell value={changeValue} />
          </div>

          <div className="hidden md:block col-span-2 text-right text-sm font-mono font-medium text-white/40">
            <MarketCapCell value={coin.cap} />
          </div>
        </>
      </div>
    );
  },
);

CoinRow.displayName = "CoinRow";

export const LiveCoinTable = memo(
  ({ initialData = [] }: LiveCoinTableProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const liveCoins = useCryptoWebSocket(initialData);

    const favoriteIds = useSelector(
      (state: RootState) => state.crypto.favorites.map((f: any) => f.id),
      shallowEqual,
    );

    const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

    const handleToggleFavorite = useCallback(
      (coin: Coin) => {
        if (!coin.id || coin.id === 0) return;
        dispatch(toggleFavoriteAction(coin.id));
      },
      [dispatch],
    );

    if (liveCoins.length === 0) {
      return (
        <div className="p-6 sm:p-8 text-white/20 text-center text-sm">
          No coins found...
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full">
        {/* Desktop Table Header */}
        <div className="hidden md:grid grid-cols-12 px-4 sm:px-6 py-3 sm:py-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.2em] text-white/20 border-b border-white/5">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Coin</div>
          <div className="col-span-3 text-right">Price</div>
          <div className="col-span-2 text-right">24h %</div>
          <div className="col-span-2 text-right">Market Cap</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col gap-2 sm:gap-1 mt-2 max-h-[500px] sm:max-h-[580px] overflow-y-auto px-1 sm:pr-2 custom-scrollbar">
          {liveCoins.map((coin, index) => (
            <CoinRow
              key={coin.id || coin.symbol}
              coin={coin}
              index={index}
              isFav={favoriteSet.has(coin.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </div>
    );
  },
);

LiveCoinTable.displayName = "LiveCoinTable";
