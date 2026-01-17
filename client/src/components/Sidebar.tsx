"use client";

import { RiBankLine, RiSettings4Line, RiMenu4Line } from "react-icons/ri";
import { MdRadar } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { FaCaretLeft } from "react-icons/fa6";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/authSlice/asyncActions";
import { FiCreditCard } from "react-icons/fi";

const navItems = [
  { name: "Finance", href: "/hub/finance", icon: <RiBankLine size={20} /> },
  { name: "Uptime Monitor", href: "/hub/monitor", icon: <MdRadar size={20} /> },
  { name: "Crypto Tracker", href: "/hub/crypto", icon: <GoGraph size={20} /> },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const initials = user?.username?.charAt(0).toUpperCase() ?? "?";

  return (
    <aside
      className={`hidden flex-col md:flex bg-[#07141b] transition-all duration-500 ease-in-out border-r border-white/5 h-screen sticky top-0 z-50 ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      {/* BRAND SECTION */}
      <div className="flex h-[100px] items-center px-8">
        <Link href="/hub" className="flex items-center gap-4 group">
          <div className="min-w-[42px] h-[42px] bg-[#38CA6B] rounded-xl flex items-center justify-center text-[#07141b] text-xl font-black shadow-[0_0_25px_rgba(56,202,107,0.3)] group-hover:scale-105 transition-transform">
            S
          </div>
          {!collapsed && (
            <div className="flex flex-col animate-in fade-in slide-in-from-left-4">
              <span className="text-xl tracking-tighter uppercase font-black text-white leading-none">
                Sublime<span className="text-[#38CA6B]">Hub</span>
              </span>
              <span className="text-[10px] font-bold text-white/20 tracking-[0.4em] uppercase mt-1.5">
                Workspace
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* NAVIGATION */}
      <div className="flex-1 px-4 mt-4">
        <div className={`py-4 ${!collapsed ? "px-2" : ""}`}>
          {!collapsed && (
            <div className="flex items-center gap-2 mb-6 px-2">
              <div className="w-1 h-1 bg-[#38CA6B] rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                Management
              </span>
            </div>
          )}

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center h-12 px-4 rounded-2xl transition-all duration-300 ${
                    isActive ? "text-white" : "text-white/30 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#38CA6B]/10 to-transparent rounded-2xl border-l-2 border-[#38CA6B]/40 animate-in fade-in duration-500" />
                  )}

                  <div
                    className={`relative z-10 flex-shrink-0 transition-all duration-300 ${
                      isActive
                        ? "text-[#38CA6B] scale-110 drop-shadow-[0_0_8px_rgba(56,202,107,0.5)]"
                        : "group-hover:text-[#38CA6B]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {!collapsed && (
                    <span className="relative z-10 ml-4 text-sm font-bold tracking-tight">
                      {item.name}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-[#38CA6B] shadow-[0_0_10px_#38CA6B]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* USER SECTION */}
      <div className="p-4 mb-4">
        <div
          ref={dropdownRef}
          className={`relative flex items-center gap-3 p-3 rounded-[24px] bg-white/[0.01] border border-white/5 transition-all duration-500 shadow-2xl ${
            collapsed ? "flex-col py-6" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="h-10 w-10 rounded-xl bg-[#14202D] border border-white/10 flex items-center justify-center text-sm font-bold text-[#38CA6B] shadow-inner">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#07141b] rounded-full flex items-center justify-center border border-white/5">
                <div className="w-2 h-2 bg-[#38CA6B] rounded-full animate-pulse" />
              </div>
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <div className="text-sm font-bold truncate text-white tracking-tight">
                  {user?.username}
                </div>
                <div className="text-[10px] font-black text-[#38CA6B]/40 uppercase tracking-widest mt-0.5">
                  Free plan
                </div>
              </div>
            )}
          </div>

          <div
            className={`flex items-center ${
              collapsed ? "flex-col mt-4 gap-2" : "gap-1"
            }`}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isOpen
                  ? "bg-[#38CA6B] text-[#07141b]"
                  : "text-white/20 hover:text-white"
              }`}
            >
              <RiMenu4Line size={20} />
            </button>
            {!collapsed && (
              <button
                onClick={() => setCollapsed(true)}
                className="p-2 text-white/5 hover:text-white transition-colors"
              >
                <FaCaretLeft size={16} />
              </button>
            )}
          </div>

          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#38CA6B] rounded-full flex items-center justify-center text-[#07141b] shadow-lg cursor-pointer hover:scale-110 transition-transform"
            >
              <FaCaretLeft size={12} className="rotate-180" />
            </button>
          )}

          {isOpen && (
            <div className="absolute left-[calc(100%+20px)] bottom-0 w-72 animate-in fade-in zoom-in-95 slide-in-from-left-4 duration-300 z-[100]">
              <div className="bg-[#0b1a22]/98 backdrop-blur-3xl border border-white/10 rounded-[32px] p-3 shadow-[40px_0_80px_rgba(0,0,0,0.7)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#38CA6B]/5 blur-3xl rounded-full" />

                <div className="px-4 py-3 mb-2 flex justify-between items-center border-b border-white/5">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                    Account Session
                  </p>
                </div>

                <div className="space-y-1 relative">
                  <button className="w-full flex items-start gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-all group text-left">
                    <div className="mt-1">
                      <FiCreditCard
                        className="text-[#38CA6B] group-hover:scale-110 transition-transform flex-shrink-0"
                        size={20}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-bold text-white group-hover:text-white transition-colors leading-none">
                        Billing & Plan
                      </span>
                      <span className="text-[10px] font-medium text-white/40 mt-1 leading-tight">
                        Manage subscription and payments
                      </span>
                    </div>
                  </button>

                  <Link href="/hub/settings" className="block">
                    <button className="w-full flex items-start gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-all group text-left cursor-pointer">
                      <RiSettings4Line
                        className="text-[#38CA6B] group-hover:scale-110 transition-transform flex-shrink-0"
                        size={20}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-bold text-white group-hover:text-white transition-colors leading-none">
                          Account details
                        </span>
                        <span className="text-[10px] font-medium text-white/40 mt-1 leading-tight">
                          Check your account details
                        </span>
                      </div>
                    </button>
                  </Link>

                  <div className="h-px bg-white/5 mx-3 my-2" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest cursor-pointer"
                  >
                    <IoIosLogOut size={20} className="flex-shrink-0" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
