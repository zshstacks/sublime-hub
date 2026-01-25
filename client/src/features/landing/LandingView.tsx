"use client";

import React, { useState, useEffect } from "react";
import {
  FiArrowRight,
  FiActivity,
  FiTrendingUp,
  FiShield,
  FiMenu,
  FiX,
  FiGithub,
  FiClock,
  FiBarChart2,
  FiZap,
  FiLayers,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const LandingView = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const revealClasses =
    "animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both";

  return (
    <div className="min-h-screen bg-[#07141b] text-white overflow-x-hidden font-sans relative selection:bg-[#38CA6B]/30">
      {/* BACKGROUND LAYERS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#07141b_100%)]" />

        {/* Mouse Follow Glow */}
        <div
          className="absolute w-[400px] h-[400px] bg-[#38CA6B]/5 blur-[120px] rounded-full transition-transform duration-1000 ease-out hidden lg:block"
          style={{
            transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
          }}
        />
      </div>

      {/*navbar*/}
      <nav
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-md transition-all duration-500 ${revealClasses}`}
      >
        <div className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase group cursor-pointer">
          <FiLayers
            className="text-[#38CA6B] group-hover:rotate-90 transition-transform duration-500"
            size={24}
          />
          <span>
            Sublime<span className="text-[#38CA6B]">Hub</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-bold text-[10px] tracking-[0.2em] uppercase">
          <a
            href="#features"
            className="text-white/40 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="/login"
            className="text-white/40 hover:text-white transition-colors"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-[#38CA6B]/10 border border-[#38CA6B]/20 text-[#38CA6B] px-5 py-2 rounded-lg hover:bg-[#38CA6B] hover:text-[#07141b] transition-all active:scale-95 shadow-[0_0_20px_rgba(56,202,107,0.1)]"
          >
            Get Access
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-[#38CA6B]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/*  MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[49] bg-[#07141b] flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <a
          onClick={() => setIsMenuOpen(false)}
          href="#features"
          className="text-3xl font-black tracking-widest uppercase hover:text-[#38CA6B] transition-colors"
        >
          Features
        </a>
        <a
          onClick={() => setIsMenuOpen(false)}
          href="/login"
          className="text-3xl font-black tracking-widest uppercase hover:text-[#38CA6B] transition-colors"
        >
          Login
        </a>
        <a
          onClick={() => setIsMenuOpen(false)}
          href="/register"
          className="text-3xl font-black tracking-widest uppercase text-[#38CA6B]"
        >
          Register
        </a>
        <div className="flex gap-10 mt-12">
          <a href="https://github.com/zshstacks" target="_blank">
            <FiGithub size={32} className="text-white/40 hover:text-white" />
          </a>
          <a href="https://x.com/zshstacks" target="_blank">
            <FaXTwitter size={32} className="text-white/40 hover:text-white" />
          </a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-48 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className={`text-left ${revealClasses} delay-200`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38CA6B]/5 border border-[#38CA6B]/10 text-[#38CA6B] text-[9px] font-bold uppercase tracking-[0.3em] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38CA6B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38CA6B]"></span>
              </span>
              Live WebSocket Powered
            </div>
            <h1 className="text-7xl md:text-8xl font-black tracking-[-0.04em] leading-[0.9] mb-8">
              UNIFIED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38CA6B] via-emerald-200 to-[#38CA6B] bg-[length:200%_auto] animate-shimmer">
                CONTROL.
              </span>
            </h1>
            <p className="text-white/50 text-xl max-w-lg mb-10 leading-relaxed font-medium border-l-2 border-[#38CA6B]/30 pl-6">
              Real-time uptime monitoring and live crypto tracking in one
              powerful platform. Monitor your infrastructure and watch markets
              move simultaneously.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/register"
                className="group flex items-center gap-3 bg-[#38CA6B] text-[#07141b] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg hover:shadow-[#38CA6B]/30"
              >
                Start Monitoring{" "}
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>

          {/* Live Dashboard Preview */}
          <div
            className={`relative hidden lg:block animate-float ${revealClasses} delay-500`}
          >
            <div className="relative z-10 bg-white/[0.03] border border-white/10 p-4 rounded-[2rem] backdrop-blur-3xl shadow-2xl group hover:border-[#38CA6B]/20 transition-colors duration-500">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4 px-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#38CA6B]/40" />
                </div>
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
                  live_dashboard
                </div>
              </div>
              <div className="space-y-4">
                {/* Monitor Status Row */}
                <div className="flex gap-2">
                  <div className="flex-1 h-16 bg-[#38CA6B]/10 rounded-xl border border-[#38CA6B]/20 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiCheck className="text-[#38CA6B]" size={16} />
                      <span className="text-[9px] font-bold text-white/60">
                        api.prod
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#38CA6B]">
                      99.8%
                    </div>
                  </div>
                  <div className="flex-1 h-16 bg-rose-500/10 rounded-xl border border-rose-500/20 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiAlertCircle className="text-rose-500" size={16} />
                      <span className="text-[9px] font-bold text-white/60">
                        cdn.api
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-rose-500">
                      94.2%
                    </div>
                  </div>
                </div>

                {/* Crypto Prices */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-[9px] text-white/40 mb-1">
                      BTC/USDT
                    </div>
                    <div className="text-sm font-bold text-[#38CA6B] animate-pulse">
                      $94,582
                    </div>
                    <div className="text-[8px] text-[#38CA6B]">+2.4%</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-[9px] text-white/40 mb-1">
                      ETH/USDT
                    </div>
                    <div className="text-sm font-bold text-rose-500 animate-pulse">
                      $3,241
                    </div>
                    <div className="text-[8px] text-rose-500">-1.2%</div>
                  </div>
                </div>

                {/* Response Time Graph */}
                <div className="h-20 bg-[#38CA6B]/5 rounded-xl border border-[#38CA6B]/10 p-3 relative overflow-hidden">
                  <div className="flex items-end gap-1 h-full">
                    {[40, 70, 45, 90, 65, 80, 55, 75].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#38CA6B]/30 rounded-t-sm animate-grow"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute top-2 left-3 text-[8px] text-white/40 font-mono">
                    Response Latency
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#38CA6B]/20 blur-3xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-6 py-32"
      >
        <div className={`text-center mb-16 ${revealClasses} delay-600`}>
          <h2 className="text-5xl font-black tracking-tighter mb-4 uppercase">
            Dual-Core <span className="text-[#38CA6B]">Monitoring</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Two powerful modules working in perfect harmony with real-time
            WebSocket updates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Uptime Monitor */}
          <div
            className={`p-8 rounded-[2.5rem] bg-gradient-to-br from-[#38CA6B]/10 to-transparent border border-[#38CA6B]/20 hover:border-[#38CA6B]/40 transition-all group relative overflow-hidden ${revealClasses} delay-700`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#38CA6B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <FiActivity
                  size={40}
                  className="text-[#38CA6B] group-hover:scale-110 transition-transform"
                />
                <h3 className="text-3xl font-black tracking-tight">
                  Uptime Monitor
                </h3>
              </div>

              <p className="text-white/50 mb-6 leading-relaxed">
                Track your infrastructure health with military precision. Get
                instant alerts when services go down.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FiClock
                    className="text-[#38CA6B] mt-1 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <div className="text-sm font-bold text-white/80">
                      HTTP Heartbeat Monitoring
                    </div>
                    <div className="text-xs text-white/40">
                      30s to 60m check intervals
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiBarChart2
                    className="text-[#38CA6B] mt-1 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <div className="text-sm font-bold text-white/80">
                      Stability Indicators
                    </div>
                    <div className="text-xs text-white/40">
                      Real-time uptime percentage per monitor
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiZap
                    className="text-[#38CA6B] mt-1 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <div className="text-sm font-bold text-white/80">
                      Response Latency Graphs
                    </div>
                    <div className="text-xs text-white/40">
                      Live heartbeat timeline visualization
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiShield
                    className="text-[#38CA6B] mt-1 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <div className="text-sm font-bold text-white/80">
                      System Health Dashboard
                    </div>
                    <div className="text-xs text-white/40">
                      Overall health percentage & status overview
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Crypto Tracker */}
          <div
            className={`p-8 rounded-[2.5rem] bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 hover:border-amber-500/40 transition-all group relative overflow-hidden ${revealClasses} delay-800`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <FiTrendingUp
                  size={40}
                  className="text-amber-400 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-3xl font-black tracking-tight">
                  Crypto Tracker
                </h3>
              </div>

              <p className="text-white/50 mb-6 leading-relaxed">
                Live cryptocurrency data via Binance WebSocket API. Watch
                markets move in real-time.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FiTrendingUp
                    className="text-amber-400 mt-1 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <div className="text-sm font-bold text-white/80">
                      450+ Live Assets
                    </div>
                    <div className="text-xs text-white/40">
                      Real-time price, market cap & 24h change
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiLayers
                    className="text-amber-400 mt-1 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <div className="text-sm font-bold text-white/80">
                      Smart Categorization
                    </div>
                    <div className="text-xs text-white/40">
                      Layer1, DeFi, AI, Gaming, Meme, Stable, Layer2
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiBarChart2
                    className="text-amber-400 mt-1 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <div className="text-sm font-bold text-white/80">
                      Market Intelligence
                    </div>
                    <div className="text-xs text-white/40">
                      24h volume, BTC dominance, ETH gas tracker
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiZap
                    className="text-amber-400 mt-1 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <div className="text-sm font-bold text-white/80">
                      Trending & Top Gainers
                    </div>
                    <div className="text-xs text-white/40">
                      Favorites list with Framer Motion animations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Highlight */}
        <div
          className={`p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all ${revealClasses} delay-900`}
        >
          <h4 className="text-xl font-black mb-4 text-center text-white/60">
            POWERED BY MODERN ARCHITECTURE
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "WebSocket",
              "Next.js",
              "React",
              "TypeScript",
              "Redux",
              "Golang",
              "Echo",
              "PostgreSQL",
              "JWT Auth",
              "OAuth2",
            ].map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-black px-4 py-2 bg-white/5 border border-white/10 rounded-lg tracking-widest text-white/40 hover:text-[#38CA6B] hover:border-[#38CA6B]/30 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY & AUTH SECTION */}
      <section
        className={`max-w-7xl mx-auto px-6 pb-40 ${revealClasses} delay-[1000ms]`}
      >
        <div className="relative rounded-[3rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5 p-12 overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <FiShield
              size={200}
              className="group-hover:rotate-12 transition-transform duration-[2s]"
            />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-black tracking-tighter mb-6 uppercase">
              Enterprise-grade security.
            </h2>
            <p className="text-white/40 mb-6 font-medium">
              Your data is protected with JWT authentication, refresh token
              rotation, and secure OAuth2 integration with Google. Email
              confirmation with OTP and password recovery ensure your account
              stays protected.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <FiCheck className="text-[#38CA6B] mt-1" size={20} />
                <div>
                  <div className="font-bold text-sm">JWT Cookie Auth</div>
                  <div className="text-xs text-white/40">
                    Refresh token rotation
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiCheck className="text-[#38CA6B] mt-1" size={20} />
                <div>
                  <div className="font-bold text-sm">OAuth2 Google</div>
                  <div className="text-xs text-white/40">Seamless login</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiCheck className="text-[#38CA6B] mt-1" size={20} />
                <div>
                  <div className="font-bold text-sm">Email Verification</div>
                  <div className="text-xs text-white/40">
                    Automatic OTP delivery
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiCheck className="text-[#38CA6B] mt-1" size={20} />
                <div>
                  <div className="font-bold text-sm">Password Recovery</div>
                  <div className="text-xs text-white/40">OTP-based reset</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center relative z-10">
        <div className="flex justify-center gap-10 mb-8 text-white/20">
          <a
            href="https://github.com/zshstacks"
            target="_blank"
            className="hover:text-[#38CA6B] transition-colors hover:scale-110"
          >
            <FiGithub size={24} />
          </a>
          <a
            href="https://x.com/zshstacks"
            target="_blank"
            className="hover:text-[#38CA6B] transition-colors hover:scale-110"
          >
            <FaXTwitter size={24} />
          </a>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
            SublimeHub // Real-time Monitoring Platform
          </p>
          <div className="h-[1px] w-12 bg-[#38CA6B]/20" />
          <p className="text-[9px] font-medium text-white/5 mt-2">
            v1.0.4-stable // WebSocket Powered
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes grow {
          from {
            transform: scaleY(0.4);
          }
          to {
            transform: scaleY(1);
          }
        }
        .animate-grow {
          animation: grow 1.5s ease-in-out infinite alternate;
          transform-origin: bottom;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingView;
