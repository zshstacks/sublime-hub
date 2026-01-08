"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiActivity,
  FiTrendingUp,
  FiShield,
  FiBox,
  FiCommand,
  FiMenu,
  FiX,
  FiGithub,
} from "react-icons/fi";
import { cn } from "@/lib/utils";
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
        className={cn(
          "fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-md transition-all duration-500",
          revealClasses,
        )}
      >
        <div className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase group cursor-pointer">
          <FiCommand
            className="text-[#38CA6B] group-hover:rotate-90 transition-transform duration-500"
            size={24}
          />
          <span>
            Sublime<span className="text-[#38CA6B]">Hub</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-bold text-[10px] tracking-[0.2em] uppercase">
          <Link
            href="/login"
            className="text-white/40 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-[#38CA6B]/10 border border-[#38CA6B]/20 text-[#38CA6B] px-5 py-2 rounded-lg hover:bg-[#38CA6B] hover:text-[#07141b] transition-all active:scale-95 shadow-[0_0_20px_rgba(56,202,107,0.1)]"
          >
            Get Access
          </Link>
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
        className={cn(
          "fixed inset-0 z-[49] bg-[#07141b] flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden",
          isMenuOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <Link
          onClick={() => setIsMenuOpen(false)}
          href="/login"
          className="text-3xl font-black tracking-widest uppercase hover:text-[#38CA6B] transition-colors"
        >
          Login
        </Link>
        <Link
          onClick={() => setIsMenuOpen(false)}
          href="/register"
          className="text-3xl font-black tracking-widest uppercase text-[#38CA6B]"
        >
          Register
        </Link>
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
          <div className={cn("text-left", revealClasses, "delay-200")}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38CA6B]/5 border border-[#38CA6B]/10 text-[#38CA6B] text-[9px] font-bold uppercase tracking-[0.3em] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38CA6B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38CA6B]"></span>
              </span>
              System Operational 2026
            </div>
            <h1 className="text-7xl md:text-8xl font-black tracking-[-0.04em] leading-[0.9] mb-8">
              UNIFIED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38CA6B] via-emerald-200 to-[#38CA6B] bg-[length:200%_auto] animate-shimmer">
                CONTROL.
              </span>
            </h1>
            <p className="text-white/50 text-xl max-w-lg mb-10 leading-relaxed font-medium border-l-2 border-[#38CA6B]/30 pl-6">
              The ecosystem for developers and investors. Monitoring, Finance,
              and Crypto assets, synchronized in one sublime interface.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-3 bg-[#38CA6B] text-[#07141b] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg hover:shadow-[#38CA6B]/30"
              >
                Launch System{" "}
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#07141b] bg-[#1a2c38] flex items-center justify-center text-[10px] font-bold text-white/40"
                  >
                    U{i}
                  </div>
                ))}
                <span className="pl-6 text-[10px] font-black text-white/40 uppercase tracking-widest">
                  Join 2k+ users
                </span>
              </div>
            </div>
          </div>

          {/* Abstract Dashboard Visual */}
          <div
            className={cn(
              "relative hidden lg:block animate-float",
              revealClasses,
              "delay-500",
            )}
          >
            <div className="relative z-10 bg-white/[0.03] border border-white/10 p-4 rounded-[2rem] backdrop-blur-3xl shadow-2xl group hover:border-[#38CA6B]/20 transition-colors duration-500">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4 px-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#38CA6B]/40" />
                </div>
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
                  sublime_kernel_v1.0
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-[#38CA6B]/5 rounded-xl border border-[#38CA6B]/10 p-4 relative overflow-hidden group/card">
                  <div className="h-1 w-1/2 bg-[#38CA6B] rounded-full mb-2" />
                  <div className="h-1 w-full bg-white/5 rounded-full mb-2" />
                  <div className="flex items-end gap-1 absolute bottom-4 left-4 right-4 h-12">
                    {[40, 70, 45, 90, 65, 80].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#38CA6B]/20 rounded-t-sm animate-grow"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="h-32 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <FiActivity size={14} className="text-[#38CA6B]" />
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full" />
                </div>
                <div className="col-span-2 h-20 bg-gradient-to-r from-[#38CA6B]/10 to-transparent rounded-xl border border-[#38CA6B]/10 flex items-center px-6">
                  <div className="flex gap-4 w-full">
                    <div className="h-2 w-1/4 bg-white/10 rounded-full" />
                    <div className="h-2 w-1/3 bg-white/5 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#38CA6B]/20 blur-3xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* MODULES BENTO BOX  */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: FiShield,
              title: "Finance Tracker",
              delay: "delay-700",
              desc: "Military-grade encryption for your personal cash flow. Track every cent with precision.",
            },
            {
              icon: FiActivity,
              title: "Uptime Guard",
              delay: "delay-800",
              desc: "Global heartbeat monitoring for your servers. Get notified before your users do.",
            },
            {
              icon: FiTrendingUp,
              title: "Crypto Watcher",
              delay: "delay-900",
              desc: "Live price action and portfolio balance across multiple exchanges and wallets.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={cn(
                "p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-[#38CA6B]/30 transition-all group relative overflow-hidden",
                revealClasses,
                item.delay,
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#38CA6B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <item.icon
                size={32}
                className="text-[#38CA6B] mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform"
              />
              <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-[#38CA6B] transition-colors">
                {item.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FUTURE SECTION  */}
      <section
        className={cn(
          "max-w-7xl mx-auto px-6 pb-40",
          revealClasses,
          "delay-[1100ms]",
        )}
      >
        <div className="relative rounded-[3rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5 p-12 overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <FiBox
              size={200}
              className="group-hover:rotate-12 transition-transform duration-[2s]"
            />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-black tracking-tighter mb-6 uppercase">
              Extensibility by design.
            </h2>
            <p className="text-white/40 mb-8 font-medium">
              SublimeHub is built to grow. Our upcoming SDK will allow you to
              plug in your own modules written in{" "}
              <span className="text-[#38CA6B]">TypeScript</span>,{" "}
              <span className="text-[#38CA6B]">Go</span>, or{" "}
              <span className="text-[#38CA6B]">Rust</span>.
            </p>
            <div className="flex gap-4">
              {["Go", "Rust", "TS", "Odin"].map((lang) => (
                <span
                  key={lang}
                  className="text-[10px] font-black px-4 py-1.5 bg-white/5 border border-white/10 rounded-md tracking-widest text-white/40 hover:text-[#38CA6B] hover:border-[#38CA6B]/30 transition-all cursor-default"
                >
                  {lang}
                </span>
              ))}
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
            SublimeHub // Operational 2026
          </p>
          <div className="h-[1px] w-12 bg-[#38CA6B]/20" />
          <p className="text-[9px] font-medium text-white/5 mt-2">
            v1.0.4-stable // Riga, LV
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
      `}</style>
    </div>
  );
};

export default LandingView;
