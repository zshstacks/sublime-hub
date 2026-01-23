"use client";

import React, { useEffect } from "react";
import { FiActivity, FiGlobe } from "react-icons/fi";
import { MarketStatsHeader } from "./components/MarketStatsHeader";
import { LiveCoinTable } from "./components/LiveCoinTable";
import { TrendingSidebar } from "./components/TrendingSidebar";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  fetchTrendingCoins,
} from "@/redux/cryptoSlice/asyncActions";

const CryptoView = () => {
  const dispatch: AppDispatch = useDispatch();

  const { favorites, loading, trendingCoins, topGainers } = useSelector(
    (state: RootState) => state.crypto,
  );

  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(fetchTrendingCoins());
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 lg:gap-8 animate-in fade-in duration-500 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
        <div>
          <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
            <FiGlobe size={14} className="sm:w-4 sm:h-4" />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
              Live Market Data
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Market Overview
          </h1>
        </div>
      </div>

      <MarketStatsHeader />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 w-full">
        <div className="xl:col-span-9 flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
              <FiActivity className="text-[#38CA6B]" size={14} /> Live Rankings
            </h3>
          </div>

          {loading && favorites.length === 0 ? (
            <div className="text-white/20 text-center py-12 sm:py-16 lg:py-20 italic text-sm">
              Synchronizing assets...
            </div>
          ) : favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl sm:rounded-3xl px-4">
              <p className="text-white/40 text-xs sm:text-sm mb-3 sm:mb-4 text-center">
                No favorite assets added yet.
              </p>
              <Link
                href="/hub/crypto/explorer"
                className="text-[#38CA6B] text-[10px] sm:text-xs font-bold uppercase hover:underline"
              >
                Go to Explorer
              </Link>
            </div>
          ) : (
            <LiveCoinTable initialData={favorites} />
          )}
        </div>

        <div className="xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-6">
          <TrendingSidebar
            title="Trending"
            type="trending"
            data={trendingCoins}
          />
          <TrendingSidebar
            title="Top Gainers"
            type="gainers"
            data={topGainers}
          />
        </div>
      </div>
    </div>
  );
};

export default CryptoView;
