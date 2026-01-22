"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiTrendingUp, FiZap, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTrendingCoins } from "@/redux/cryptoSlice/asyncActions";
import { Coin } from "@/features/crypto/types";

interface TrendingSidebarProps {
  title: string;
  type: "trending" | "gainers";
}

interface BinanceTicker {
  s: string; // symbol
  c: string; // current price
  P: string; // price change percentage
}

export const TrendingSidebar = ({ title, type }: TrendingSidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { trendingCoins, topGainers, trendingLoading } = useSelector(
    (state: RootState) => state.crypto,
  );
  const [liveCoins, setLiveCoins] = useState<Coin[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const baseCoins = type === "trending" ? trendingCoins : topGainers;

  useEffect(() => {
    setLiveCoins(baseCoins);
  }, [baseCoins]);

  useEffect(() => {
    dispatch(fetchTrendingCoins());

    const interval = setInterval(() => {
      dispatch(fetchTrendingCoins());
    }, 120000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // WebSocket for live price updates
  useEffect(() => {
    if (baseCoins.length === 0) return;

    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = new WebSocket("ws://localhost:8000/api/crypto/ws");
    socketRef.current = socket;

    // socket.onopen = () => {
    // console.log("Trending sidebar WebSocket connected");
    // };

    socket.onmessage = (event) => {
      try {
        const tickers: BinanceTicker[] = JSON.parse(event.data);

        setLiveCoins((currentCoins) =>
          currentCoins.map((coin) => {
            const searchSymbol = coin.symbol.endsWith("USDT")
              ? coin.symbol
              : `${coin.symbol}USDT`;

            const ticker = tickers.find((t) => t.s === searchSymbol);

            if (ticker) {
              const newPrice = parseFloat(ticker.c);
              const priceChange = parseFloat(ticker.P);

              return {
                ...coin,
                price: newPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                }),
                h24: `${priceChange >= 0 ? "+" : ""}${priceChange.toFixed(2)}%`,
              };
            }
            return coin;
          }),
        );
      } catch (err) {
        // console.error("Error processing WebSocket message:", err);
      }
    };

    // socket.onerror = (error) => {
    // console.error("WebSocket error:", error);
    // };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [baseCoins.length]);

  if (trendingLoading && liveCoins.length === 0) {
    return (
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 shadow-xl">
        <div className="h-8 bg-white/5 rounded animate-pulse mb-6" />
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 animate-pulse" />
                <div>
                  <div className="h-4 w-20 bg-white/5 rounded animate-pulse mb-1" />
                  <div className="h-3 w-12 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
              <div className="text-right">
                <div className="h-4 w-16 bg-white/5 rounded animate-pulse mb-1" />
                <div className="h-3 w-12 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (liveCoins.length === 0) {
    return null;
  }

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
        {liveCoins.slice(0, 3).map((coin) => {
          const isPositive = coin.h24?.startsWith("+");

          return (
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
                    {coin.baseAsset}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white font-mono tabular-nums">
                  {coin.price || "---"}
                </p>
                <p
                  className={`text-[10px] font-bold ${
                    isPositive ? "text-[#38CA6B]" : "text-rose-500"
                  }`}
                >
                  {coin.h24 || "0.00%"}
                </p>
              </div>
            </div>
          );
        })}
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
