"use client";

import { RiBankLine } from "react-icons/ri";
import { MdRadar } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { FaCaretLeft } from "react-icons/fa6";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Finance", href: "/hub/finance", icon: <RiBankLine size={20} /> },
  { name: "Uptime Monitor", href: "/hub/monitor", icon: <MdRadar size={20} /> },
  { name: "Crypto Tracker", href: "/hub/crypto", icon: <GoGraph size={19} /> },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const user = {
    name: "zshstacks",
    avatarUrl: null,
  };

  const initials = user.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <aside
      className={`hidden flex-col md:flex shadow-md bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)] transition-all duration-300 ease-in-out border-r border-white/5 h-screen sticky top-0 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center px-6 font-bold text-2xl tracking-tight overflow-hidden">
        <Link href="/hub" className="flex items-center gap-3">
          <div className="min-w-[32px] h-8 bg-[#38CA6B] rounded-lg flex items-center justify-center text-white text-base">
            S
          </div>
          <span
            className={`transition-all duration-300 ${
              collapsed
                ? "opacity-0 translate-x-10 w-0"
                : "opacity-100 translate-x-0"
            } whitespace-nowrap`}
          >
            SublimeHub
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4 overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              title={collapsed ? item.name : ""}
              className={`group flex items-center h-11 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div
                className={`flex-shrink-0 transition-colors duration-200 ${
                  isActive ? "text-[#38CA6B]" : "group-hover:text-[#38CA6B]"
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`ml-4 text-sm font-medium transition-all duration-300 ${
                  collapsed
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto"
                } whitespace-nowrap`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="relative p-4 border-t border-white/5">
        <div
          className={`flex items-center ${collapsed ? "flex-col gap-4" : "justify-between"}`}
        >
          {/* User info & Avatar */}
          <div className="flex items-center gap-3 min-w-0">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="User avatar"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-white/5"
              />
            ) : (
              <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gradient-to-tr from-[#38CA6B] to-emerald-700 flex items-center justify-center text-sm font-bold text-white">
                {initials}
              </div>
            )}

            {!collapsed && (
              <div className="min-w-0 transition-opacity duration-300">
                <div className="text-sm font-semibold truncate text-white">
                  {user.name}
                </div>
                <div className="text-xs text-white/40">Free Plan</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div
            className={`flex items-center ${collapsed ? "flex-col gap-2" : "gap-1"}`}
          >
            {!collapsed && (
              <button
                onClick={() => setIsOpen((v) => !v)}
                className="rounded-lg p-1.5 hover:bg-white/10 text-white/60 transition-colors cursor-pointer"
                aria-label="Open user menu"
              >
                <IoIosMore size={18} />
              </button>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="rounded-lg p-1.5 hover:bg-white/10 text-[#38CA6B] transition-colors cursor-pointer"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FaCaretLeft
                size={18}
                className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Dropdown menu */}
        {isOpen && !collapsed && (
          <div className="absolute left-4 right-4 bottom-20 rounded-xl border border-white/10 bg-[#14202D] shadow-lg overflow-hidden z-50">
            <ul className="flex flex-col py-1 text-sm text-white/80">
              <li className="px-4 py-2.5 hover:bg-white/5 cursor-pointer transition-colors">
                Profile
              </li>
              <li className="px-4 py-2.5 hover:bg-white/5 cursor-pointer transition-colors">
                Settings
              </li>
              <div className="h-px bg-white/5 mx-2 my-1" />
              <li className="px-4 py-2.5 hover:bg-white/5 cursor-pointer text-red-400 transition-colors font-medium">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
