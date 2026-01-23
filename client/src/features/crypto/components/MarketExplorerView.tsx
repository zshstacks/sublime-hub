"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  FiArrowLeft,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiGlobe,
  FiChevronDown,
} from "react-icons/fi";
import { LiveCoinTable } from "@/features/crypto/components/LiveCoinTable";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchFavorites,
  fetchCategories,
  fetchFilteredCoins,
} from "@/redux/cryptoSlice/asyncActions";

const ITEMS_PER_PAGE = 50;
type FilterType = "all" | "gainers" | "new";

const MarketExplorerView = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    filteredCoins = [],
    filteredCoinsLoading,
    categories = [],
    favorites = [],
  } = useSelector((state: RootState) => state.crypto);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
    if (favorites.length === 0) dispatch(fetchFavorites());
  }, [dispatch, categories.length, favorites.length]);

  useEffect(() => {
    dispatch(
      fetchFilteredCoins({
        filter: selectedFilter,
        category: selectedCategory,
      }),
    );
  }, [dispatch, selectedFilter, selectedCategory]);

  const searchFilteredCoins = useMemo(() => {
    if (!searchQuery.trim()) return filteredCoins;
    const query = searchQuery.toLowerCase().trim();
    return filteredCoins.filter(
      (coin) =>
        coin.name?.toLowerCase().includes(query) ||
        coin.symbol?.toLowerCase().includes(query) ||
        coin.baseAsset?.toLowerCase().includes(query),
    );
  }, [filteredCoins, searchQuery]);

  const totalCoinsCount = searchFilteredCoins.length;
  const totalPages = Math.ceil(totalCoinsCount / ITEMS_PER_PAGE) || 1;

  const currentCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return searchFilteredCoins.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [searchFilteredCoins, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilter, selectedCategory]);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const getSelectedCategoryName = () => {
    if (selectedCategory === "all") return "Category: All Assets";
    const cat = categories.find((c) => c.slug === selectedCategory);
    return cat ? cat.name : "Category: All Assets";
  };

  const handleToggleCategory = useCallback(() => {
    setCategoryDropdownOpen((prev) => !prev);
  }, []);

  const handleSelectCategory = useCallback((slug: string) => {
    setSelectedCategory(slug);
    setCategoryDropdownOpen(false);
  }, []);

  return (
    <div className="w-full min-h-screen overflow-hidden p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      {/* Header Section */}
      <div className="flex-none flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <Link href="/hub/crypto">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer group">
            <FiArrowLeft size={18} className="text-[#38CA6B]" />
          </button>
        </Link>

        <div className="flex-1 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
              <FiGlobe size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Asset Explorer
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              All Market Assets
            </h1>
          </div>

          <div className="bg-white/5 border border-white/5 p-1 rounded-xl flex h-fit w-full sm:w-auto">
            {(["all", "gainers", "new"] as FilterType[]).map((f) => (
              <button
                key={`filter-${f}`}
                onClick={() => setSelectedFilter(f)}
                className={`flex-1 sm:flex-none px-4 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer ${
                  selectedFilter === f
                    ? "bg-[#38CA6B] text-white shadow-lg"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex-none grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] w-4 h-4" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all"
          />
        </div>

        <div className="relative">
          <button
            onClick={handleToggleCategory}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-sm text-white/60 flex items-center justify-between cursor-pointer"
          >
            <span className="truncate">{getSelectedCategoryName()}</span>
            <FiChevronDown
              className={`flex-shrink-0 ml-2 transition-transform ${categoryDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {categoryDropdownOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#18262e] border border-white/10 rounded-2xl shadow-2xl z-50 py-2 max-h-60 overflow-y-auto custom-scrollbar">
              <button
                onClick={() => handleSelectCategory("all")}
                className="w-full px-4 py-3 text-left text-sm text-white/60 hover:bg-white/5"
              >
                All Assets
              </button>
              {categories.map((cat) => (
                <button
                  key={`cat-list-${cat.slug || cat.id}`}
                  onClick={() => handleSelectCategory(cat.slug)}
                  className="w-full px-4 py-3 text-left text-sm text-white/60 hover:bg-white/5"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Table Container */}
      <div className="flex-1 min-h-0 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {filteredCoinsLoading ? (
            <div className="p-20 text-center text-white/20 italic font-mono text-sm">
              Synchronizing market data...
            </div>
          ) : (
            <LiveCoinTable initialData={currentCoins} />
          )}
        </div>

        {/* Footer  */}
        {!filteredCoinsLoading && totalCoinsCount > 0 && (
          <div className="flex-none flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-white/5 backdrop-blur-md gap-3">
            <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest">
              Showing{" "}
              <span className="text-[#38CA6B] font-bold">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                {Math.min(currentPage * ITEMS_PER_PAGE, totalCoinsCount)}
              </span>{" "}
              of {totalCoinsCount}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-white/5 rounded-lg text-white/40 disabled:opacity-20 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <FiChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, i) => (
                  <button
                    key={`pg-${i}-${page}`}
                    onClick={() =>
                      typeof page === "number" && setCurrentPage(page)
                    }
                    disabled={typeof page !== "number"}
                    className={`w-8 h-8 rounded-lg text-[10px] font-bold transition-all ${
                      page === currentPage
                        ? "bg-[#38CA6B] text-white shadow-lg shadow-[#38CA6B]/20"
                        : "text-white/40 hover:bg-white/5 disabled:hover:bg-transparent"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 bg-white/5 rounded-lg text-white/40 disabled:opacity-20 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketExplorerView;
