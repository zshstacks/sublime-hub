"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PriceCellProps {
  price?: string;
}

export const PriceCell = ({ price = "---" }: PriceCellProps) => {
  const prevPriceRef = useRef<number>(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const current = parseFloat(price.replace(/[$,]/g, ""));
    if (isNaN(current) || current === prevPriceRef.current) return;

    const newDirection = current > prevPriceRef.current ? "up" : "down";
    setDirection(newDirection);

    const timer = setTimeout(() => setDirection(null), 2000);
    prevPriceRef.current = current;
    return () => clearTimeout(timer);
  }, [price]);

  return (
    <div className="relative flex items-center justify-end h-10 min-w-[160px]">
      {/*  The Dynamic Pill Container */}
      <motion.div
        animate={{
          backgroundColor:
            direction === "up"
              ? "rgba(56, 202, 107, 0.1)"
              : direction === "down"
                ? "rgba(244, 63, 94, 0.1)"
                : "rgba(255, 255, 255, 0.03)",
          borderColor:
            direction === "up"
              ? "rgba(56, 202, 107, 0.3)"
              : direction === "down"
                ? "rgba(244, 63, 94, 0.3)"
                : "rgba(255, 255, 255, 0.05)",
        }}
        className="absolute inset-0 rounded-xl border transition-colors duration-700"
      />

      <div className="relative z-10 flex items-center w-full px-3 justify-between">
        {/*  Stealth Label Badge  */}
        <div className="flex-none overflow-hidden h-5">
          <AnimatePresence mode="wait">
            {direction ? (
              <motion.div
                key={direction}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className={`text-[9px] px-2 py-0.5 rounded-lg font-black tracking-tighter uppercase ${
                  direction === "up"
                    ? "bg-[#38CA6B] text-[#07141b]"
                    : "bg-rose-500 text-white"
                }`}
              >
                {direction === "up" ? "Up" : "Down"}
              </motion.div>
            ) : (
              <div className="w-8 h-px bg-white/10 mt-2.5" />
            )}
          </AnimatePresence>
        </div>

        {/* The Sliding Price */}
        <div className="overflow-hidden h-6 flex items-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={price}
              initial={{ y: direction === "up" ? 15 : -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction === "up" ? -15 : 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`text-[13px] font-bold font-mono tracking-tight tabular-nums ${
                direction === "up"
                  ? "text-[#38CA6B]"
                  : direction === "down"
                    ? "text-rose-400"
                    : "text-white/90"
              }`}
            >
              {price}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/*  Subtle Radial Shadow */}
      <AnimatePresence>
        {direction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 rounded-xl pointer-events-none shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] ${
              direction === "up" ? "shadow-[#38CA6B]/10" : "shadow-rose-500/10"
            }`}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
