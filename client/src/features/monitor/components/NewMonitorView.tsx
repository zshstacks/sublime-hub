"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  FiArrowLeft,
  FiGlobe,
  FiClock,
  FiBell,
  FiShield,
  FiActivity,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";

import { AppDispatch, RootState } from "@/redux/store";
import { createMonitor } from "@/redux/monitorSlice/asyncActions";

const NewMonitorView = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.monitor);

  const [name, setName] = useState("");
  const [type, _] = useState("http");
  const [url, setUrl] = useState("");
  const [interval, setInterval] = useState(60);
  const [notifyEmail, setNotifyEmail] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async () => {
    if (!name || !url) return alert("Please fill in all required fields");

    const monitorData = {
      name: name,
      type: type.toLowerCase(),
      url: url.startsWith("http") ? url : `https://${url}`,
      interval: interval,
      timeout: 10,
      notify_email: notifyEmail,
    };

    const result = await dispatch(createMonitor(monitorData));
    if (createMonitor.fulfilled.match(result)) {
      router.push("/hub/monitor");
    }
  };

  const intervalSteps = [30, 60, 300, 600, 1800, 3600];
  const currentStepIndex =
    intervalSteps.indexOf(interval) !== -1
      ? intervalSteps.indexOf(interval)
      : 1;

  return (
    <div className="w-full min-h-full p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      {/* Top Navigation */}
      <div className="flex items-center gap-6">
        <Link href="/hub/monitor">
          <button className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer group w-fit">
            <FiArrowLeft size={18} className="text-[#38CA6B]" />
          </button>
        </Link>

        <div>
          <div className="flex items-center gap-2 text-[#38CA6B] mb-1">
            <FiActivity size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Configuration
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Create New Monitor
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form Area */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white/5 border border-white/5 rounded-3xl p-8 shadow-2xl space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="p-2 bg-[#38CA6B]/10 rounded-lg text-[#38CA6B]">
                <FiGlobe size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Target Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Custom Monitor Type Select */}
              <div className="space-y-2 relative" ref={dropdownRef}>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
                  Monitor Type
                </label>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full bg-white/5 border ${isDropdownOpen ? "border-[#38CA6B]/50" : "border-white/5"} rounded-2xl py-3.5 px-4 text-sm text-white flex items-center justify-between cursor-pointer transition-all hover:bg-white/10`}
                >
                  <span className="font-medium">HTTP(s)</span>
                  <FiChevronDown
                    className={`text-white/20 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#18262e]  border border-white/10 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between px-4 py-3  text-white cursor-default">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">HTTP(s)</span>
                        <span className="text-[10px] text-white/40">
                          Check websites and APIs
                        </span>
                      </div>
                      <FiCheck className="text-[#38CA6B]" />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
                  Friendly Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. My Main API"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
                  URL / Hostname
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://api.example.com"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all font-mono"
                />
              </div>
            </div>
          </div>

          {/* Heartbeat Interval Card */}
          <div className="bg-white/5 border border-white/5 rounded-3xl p-8 shadow-2xl space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400">
                <FiClock size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">
                Heartbeat Interval
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60 font-medium">
                  Frequency:{" "}
                  <span className="text-[#38CA6B]">
                    Every{" "}
                    {interval < 60
                      ? `${interval} seconds`
                      : `${interval / 60} minute(s)`}
                  </span>
                </span>
                <span className="text-[10px] font-mono text-white/20">
                  Optimal for high availability
                </span>
              </div>

              <input
                type="range"
                min="0"
                max={intervalSteps.length - 1}
                step="1"
                value={currentStepIndex}
                onChange={(e) =>
                  setInterval(intervalSteps[parseInt(e.target.value)])
                }
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#38CA6B]"
              />

              <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-tighter px-1">
                {intervalSteps.map((step) => (
                  <span key={step}>
                    {step < 60 ? `${step}s` : `${step / 60}m`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Options */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
              <FiBell className="text-rose-500" /> Notifications
            </h3>

            <div className="space-y-3">
              <div
                // onClick={() => setNotifyEmail(!notifyEmail)}
                className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl   transition-all opacity-30 grayscale cursor-not-allowed"
              >
                <span className="text-sm text-white/60">Email Alerts</span>
                {/*<div*/}
                {/*  className={`w-10 h-5 rounded-full relative transition-colors ${notifyEmail ? "bg-[#38CA6B]" : "bg-white/10"}`}*/}
                {/*>*/}
                {/*  <div*/}
                {/*    className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${notifyEmail ? "left-6" : "left-1"}`}*/}
                {/*  />*/}
                {/*</div>*/}
                <div className="text-[8px] font-bold bg-white/10 px-2 py-0.5 rounded text-white/40 uppercase">
                  Soon
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl opacity-30 grayscale cursor-not-allowed">
                <span className="text-sm text-white/60">Discord Webhook</span>
                <div className="text-[8px] font-bold bg-white/10 px-2 py-0.5 rounded text-white/40 uppercase">
                  Soon
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#38CA6B]/5 border border-[#38CA6B]/10 rounded-3xl p-6">
            <div className="flex items-center gap-2 text-[#38CA6B] mb-3">
              <FiShield size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Verification
              </span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed italic">
              "We verify SSL certificates and response status codes from global
              nodes."
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#38CA6B] hover:bg-[#2fb15d] py-4 rounded-2xl font-bold text-[#0B121A] shadow-lg shadow-[#38CA6B]/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0B121A]/30 border-t-[#0B121A] rounded-full animate-spin" />
              ) : (
                "Start Monitoring"
              )}
            </button>
            <Link href="/hub/monitor">
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/5 py-4 rounded-2xl font-bold text-white/40 hover:text-white transition-all">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMonitorView;
