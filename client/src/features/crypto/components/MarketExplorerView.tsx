"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  FiArrowLeft,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiGlobe,
} from "react-icons/fi";
import { LiveCoinTable } from "@/features/crypto/components/LiveCoinTable";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchFavorites } from "@/redux/cryptoSlice/asyncActions";
import api from "@/redux/api";
import { Coin } from "@/features/crypto/types";

const ITEMS_PER_PAGE = 6;

const MarketExplorerView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchFavorites());
        const res = await api.get("/api/crypto/coins");
        setAllCoins(res.data);
      } catch (err) {
        console.error("Failed to load explorer data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  // Filter coins based on search query
  const filteredCoins = useMemo(() => {
    if (!searchQuery.trim()) return allCoins;

    const query = searchQuery.toLowerCase().trim();
    return allCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query) ||
        coin.baseAsset.toLowerCase().includes(query),
    );
  }, [allCoins, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCoins.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCoins = filteredCoins.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-full p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      <div className="flex items-center gap-6">
        <Link href="/hub/crypto">
          <button className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer group w-fit">
            <FiArrowLeft size={18} className="text-[#38CA6B]" />
          </button>
        </Link>

        <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
              <FiGlobe size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Asset Explorer
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              All Market Assets
            </h1>
            <p className="text-white/40 text-sm mt-2 font-medium">
              Browse over {allCoins.length}+ cryptocurrencies by market cap and
              volume.
            </p>
          </div>

          <div className="flex justify-between gap-3 w-fit h-fit">
            <div className="bg-white/5 border border-white/5 p-1 rounded-xl flex">
              <button className="px-4 py-1.5 bg-[#38CA6B] text-white text-[10px] font-bold uppercase rounded-lg shadow-lg transition-all">
                All
              </button>
              <button className="px-4 py-1.5 text-white/40 hover:text-white text-[10px] font-bold uppercase rounded-lg transition-all">
                Top Gainers
              </button>
              <button className="px-4 py-1.5 text-white/40 hover:text-white text-[10px] font-bold uppercase rounded-lg transition-all">
                New
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
          <input
            type="text"
            placeholder="Search by name, symbol or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all"
          />
        </div>
        <div className="relative ">
          <select className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-[#38CA6B]/30 cursor-pointer">
            <option>Category: All Assets</option>
            <option>Layer 1 Networks</option>
            <option>DeFi Ecosystem</option>
            <option>Gaming & NFT</option>
          </select>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-2 shadow-2xl">
        {loading ? (
          <div className="p-20 text-center text-white/20 italic font-mono">
            Loading assets...
          </div>
        ) : filteredCoins.length === 0 ? (
          <div className="p-20 text-center">
            <p className="text-white/40 text-sm mb-2">No assets found</p>
            <p className="text-white/20 text-xs">
              Try adjusting your search query
            </p>
          </div>
        ) : (
          <LiveCoinTable initialData={currentCoins} />
        )}

        {!loading && filteredCoins.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-8 border-t border-white/5 mt-4">
            <p className="text-xs text-white/20 font-mono">
              Showing{" "}
              <span className="text-[#38CA6B] font-bold font-sans">
                {startIndex + 1}-{Math.min(endIndex, filteredCoins.length)}
              </span>{" "}
              of{" "}
              <span className="text-white/60 font-bold font-sans">
                {filteredCoins.length}
              </span>{" "}
              assets
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white/40 hover:text-[#38CA6B] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-white/40"
              >
                <FiChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      typeof page === "number" && handlePageChange(page)
                    }
                    disabled={page === "..."}
                    className={`min-w-10 h-10 rounded-xl text-[10px] font-bold transition-all ${
                      page === currentPage
                        ? "bg-[#38CA6B] text-white shadow-lg shadow-[#38CA6B]/20"
                        : page === "..."
                          ? "text-white/20 cursor-default"
                          : "text-white/40 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white/40 hover:text-[#38CA6B] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-white/40"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketExplorerView;
