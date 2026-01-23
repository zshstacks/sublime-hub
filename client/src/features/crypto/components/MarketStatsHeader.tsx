"use client";

import { useEffect } from "react";
import {
  FiBarChart2,
  FiZap,
  FiActivity,
  FiGlobe,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchMarketStats } from "@/redux/cryptoSlice/asyncActions";

export const MarketStatsHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { marketStats, statsLoading } = useSelector(
    (state: RootState) => state.crypto,
  );

  useEffect(() => {
    dispatch(fetchMarketStats());

    const interval = setInterval(() => {
      dispatch(fetchMarketStats());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const formatMarketCap = (value: number): string => {
    if (value >= 1_000_000_000_000) {
      return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
    } else if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`;
    }
    return `$${(value / 1_000_000).toFixed(2)}M`;
  };

  const formatVolume = (value: number): string => {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(1)}B`;
    }
    return `$${(value / 1_000_000).toFixed(1)}M`;
  };

  const formatPercentage = (value: number): string => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  const getGasLevel = (gwei: number): { text: string; color: string } => {
    if (gwei < 20) return { text: "Low", color: "text-[#38CA6B]" };
    if (gwei < 50) return { text: "Medium", color: "text-amber-500" };
    return { text: "High", color: "text-rose-500" };
  };

  if (statsLoading && !marketStats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 h-20 sm:h-24 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!marketStats) {
    return null;
  }

  const gasLevel = getGasLevel(marketStats.ethGasPrice);

  const statsData = [
    {
      label: "Market Cap",
      val: formatMarketCap(marketStats.totalMarketCap),
      change: formatPercentage(marketStats.marketCapChange),
      icon: <FiGlobe className="w-4 h-4 sm:w-5 sm:h-5" />,
      isPositive: marketStats.marketCapChange >= 0,
      showTrend: true,
    },
    {
      label: "24h Volume",
      val: formatVolume(marketStats.volume24h),
      change: null,
      icon: <FiBarChart2 className="w-4 h-4 sm:w-5 sm:h-5" />,
      isPositive: true,
      showTrend: false,
    },
    {
      label: "BTC Dominance",
      val: `${marketStats.btcDominance.toFixed(1)}%`,
      change: null,
      icon: <FiZap className="w-4 h-4 sm:w-5 sm:h-5" />,
      isPositive: true,
      showTrend: false,
    },
    {
      label: "ETH Gas",
      val: `${marketStats.ethGasPrice} Gwei`,
      change: gasLevel.text,
      changeColor: gasLevel.color,
      icon: <FiActivity className="w-4 h-4 sm:w-5 sm:h-5" />,
      isPositive: marketStats.ethGasPrice < 50,
      showTrend: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {statsData.map((stat, i) => (
        <div
          key={i}
          className="bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:border-white/10 transition-all shadow-xl hover:shadow-2xl group"
        >
          <div className="p-2 sm:p-3 bg-white/5 rounded-lg sm:rounded-xl text-[#38CA6B] group-hover:bg-[#38CA6B]/10 transition-colors flex-shrink-0">
            {stat.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-white/20 mb-0.5 sm:mb-1 truncate">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-white tabular-nums">
                {stat.val}
              </span>
              {stat.change && (
                <span
                  className={`text-[9px] sm:text-[10px] font-bold flex items-center gap-0.5 sm:gap-1 ${
                    stat.changeColor
                      ? stat.changeColor
                      : stat.isPositive
                        ? "text-[#38CA6B]"
                        : "text-rose-500"
                  }`}
                >
                  {stat.showTrend && stat.isPositive && (
                    <FiTrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  )}
                  {stat.showTrend && !stat.isPositive && (
                    <FiTrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  )}
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
