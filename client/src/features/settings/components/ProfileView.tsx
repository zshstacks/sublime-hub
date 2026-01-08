"use client";

import React from "react";
import { RiKey2Line, RiShieldCheckLine } from "react-icons/ri";
import { FiAlertCircle, FiTrash2 } from "react-icons/fi";

export const ProfileView = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Main Profile Card */}
      <section className="group bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden transition-all hover:bg-white/[0.03]">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#38CA6B]/5 blur-[100px] rounded-full group-hover:bg-[#38CA6B]/10 transition-colors" />

        <div className="relative flex flex-col md:flex-row gap-10">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#38CA6B]/20 to-transparent p-1">
                <div className="w-full h-full rounded-[22px] bg-[#07141b] flex items-center justify-center text-4xl font-black text-[#38CA6B] border border-white/10">
                  Z
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs font-black text-white uppercase tracking-widest">
                zshstacks
              </p>
              <p className="text-[10px] text-white/20 font-bold uppercase mt-1">
                Member since 2024
              </p>
            </div>
          </div>

          {/* Inputs Section */}
          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-1">
                  Username
                </label>
                <input
                  type="text"
                  defaultValue="zshstacks"
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="admin@sublimehub.io"
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all font-medium"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4">
              <div className="bg-white/5 rounded-2xl p-4 flex-1 min-w-[200px] border border-white/5 hover:border-[#38CA6B]/20 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <RiKey2Line className="text-[#38CA6B]" size={18} />
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                    Two-Factor Auth
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    Currently Enabled
                  </span>
                  <div className="w-8 h-4 bg-[#38CA6B]/20 rounded-full relative">
                    <div className="absolute right-1 top-1 w-2 h-2 bg-[#38CA6B] rounded-full" />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 flex-1 min-w-[200px] border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <RiShieldCheckLine className="text-[#38CA6B]" size={18} />
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                    Plan Integrity
                  </span>
                </div>
                <p className="text-xs font-bold text-[#38CA6B]">
                  Free Tier - Level 1
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-white/[0.01] border border-rose-500/10 rounded-[2rem] p-8 flex items-center justify-between group hover:border-rose-500/30 transition-all shadow-xl">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/5 flex items-center justify-center text-rose-500">
            <FiAlertCircle size={24} />
          </div>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-widest">
              Delete Workspace
            </h2>
            <p className="text-xs font-medium text-white/20 mt-1">
              This will wipe all module data and API connections.
            </p>
          </div>
        </div>
        <button className="p-4 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-2xl transition-all">
          <FiTrash2 size={20} />
        </button>
      </section>
    </div>
  );
};
