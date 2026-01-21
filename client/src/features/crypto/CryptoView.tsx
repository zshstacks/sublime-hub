"use client";

import React, { useEffect } from "react";
import { FiActivity, FiGlobe } from "react-icons/fi";
import { MarketStatsHeader } from "./components/MarketStatsHeader";
import { LiveCoinTable } from "./components/LiveCoinTable";
import { TrendingSidebar } from "./components/TrendingSidebar";

import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "@/redux/cryptoSlice/asyncActions";

const CryptoView = () => {
  const dispatch: AppDispatch = useDispatch();

  const { favorites, loading } = useSelector(
    (state: RootState) => state.crypto,
  );

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className="w-full min-h-full p-8 flex flex-col gap-8 animate-in fade-in duration-500 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      <div className="flex justify-between items-center w-full">
        <div>
          <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
            <FiGlobe size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Live Market Data
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Market Overview
          </h1>
        </div>
      </div>

      <MarketStatsHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        <div className="lg:col-span-9 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
              <FiActivity className="text-[#38CA6B]" /> Live Rankings
            </h3>
          </div>

          {loading ? (
            <div className="text-white/20 text-center py-20 italic">
              Synchronizing assets...
            </div>
          ) : favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
              <p className="text-white/40 text-sm mb-4">
                No favorite assets added yet.
              </p>
              <Link
                href="/hub/crypto/explorer"
                className="text-[#38CA6B] text-xs font-bold uppercase hover:underline"
              >
                Go to Explorer
              </Link>
            </div>
          ) : (
            <LiveCoinTable initialData={favorites} />
          )}
        </div>

        <div className="lg:col-span-3 space-y-6">
          <TrendingSidebar title="Trending" type="trending" />
          <TrendingSidebar title="Top Gainers" type="gainers" />
        </div>
      </div>
    </div>
  );
};

export default CryptoView;
