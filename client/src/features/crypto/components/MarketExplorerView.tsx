"use client";

import React, { useEffect, useState, useMemo } from "react";
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
    categoriesLoading,
  } = useSelector((state: RootState) => state.crypto);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFavorites());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchFilteredCoins({
        filter: selectedFilter,
        category: selectedCategory,
      }),
    );
  }, [dispatch, selectedFilter, selectedCategory]);

  const searchFilteredCoins = useMemo(() => {
    const coins = filteredCoins || [];
    if (!searchQuery.trim()) return coins;

    const query = searchQuery.toLowerCase().trim();
    return coins.filter(
      (coin) =>
        coin.name?.toLowerCase().includes(query) ||
        coin.symbol?.toLowerCase().includes(query) ||
        (coin.baseAsset && coin.baseAsset.toLowerCase().includes(query)),
    );
  }, [filteredCoins, searchQuery]);

  const totalCoinsCount = searchFilteredCoins?.length || 0;
  const totalPages = Math.ceil(totalCoinsCount / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCoins = useMemo(
    () => (searchFilteredCoins || []).slice(startIndex, endIndex),
    [searchFilteredCoins, startIndex, endIndex],
  );

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getSelectedCategoryName = () => {
    if (selectedCategory === "all") return "Category: All Assets";
    const cat = categories?.find((c) => c.slug === selectedCategory);
    return cat ? cat.name : "Category: All Assets";
  };

  return (
    <div className="w-full h-screen overflow-hidden p-8 flex flex-col gap-6 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      {/*  Header  */}
      <div className="flex-none flex items-center gap-6">
        <Link href="/hub/crypto">
          <button className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer group w-fit">
            <FiArrowLeft size={18} className="text-[#38CA6B]" />
          </button>
        </Link>

        <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
              <FiGlobe size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Asset Explorer
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              All Market Assets
            </h1>
          </div>

          <div className="bg-white/5 border border-white/5 p-1 rounded-xl flex h-fit">
            {(["all", "gainers", "new"] as FilterType[]).map((f) => (
              <button
                key={`filter-${f}`}
                onClick={() => setSelectedFilter(f)}
                className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  selectedFilter === f
                    ? "bg-[#38CA6B] text-white shadow-lg"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {f === "all" ? "All" : f === "gainers" ? "Gainers" : "New"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/*  Filters Bar */}
      <div className="flex-none grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B]" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-sm text-white/60 flex items-center justify-between"
          >
            <span>{getSelectedCategoryName()}</span>
            <FiChevronDown />
          </button>
          {categoryDropdownOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#18262e] border border-white/10 rounded-2xl shadow-2xl z-50 py-2 max-h-60 overflow-y-auto">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setCategoryDropdownOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm text-white/60 hover:bg-white/5"
              >
                All Assets
              </button>
              {categories.map((cat) => (
                <button
                  key={`cat-${cat.id}`}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setCategoryDropdownOpen(false);
                  }}
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
      <div className=" min-h-0 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Table area */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {filteredCoinsLoading ? (
            <div className="p-20 text-center text-white/20 italic font-mono">
              Loading...
            </div>
          ) : (
            <LiveCoinTable initialData={currentCoins} />
          )}
        </div>

        {/* 4. Footer (Fixed height) */}
        {!filteredCoinsLoading && totalCoinsCount > 0 && (
          <div className="flex-none flex items-center justify-between px-6 py-4 border-t border-white/5  backdrop-blur-md">
            <p className="text-[10px] text-white/20 font-mono">
              Showing{" "}
              <span className="text-[#38CA6B] font-bold">
                {startIndex + 1}-{Math.min(endIndex, totalCoinsCount)}
              </span>{" "}
              of {totalCoinsCount}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 bg-white/5 rounded-lg text-white/40 disabled:opacity-20"
              >
                <FiChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      typeof page === "number" && handlePageChange(page)
                    }
                    className={`w-8 h-8 rounded-lg text-[10px] font-bold ${page === currentPage ? "bg-[#38CA6B] text-white" : "text-white/40"}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 bg-white/5 rounded-lg text-white/40 disabled:opacity-20"
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
