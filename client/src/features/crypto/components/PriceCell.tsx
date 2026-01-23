"use client";
import { useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PriceCell = memo(({ price = "---" }: { price?: string }) => {
  const prevPriceRef = useRef<number>(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const current = parseFloat(price.replace(/[$,]/g, ""));
    if (isNaN(current) || current === prevPriceRef.current) return;

    setDirection(current > prevPriceRef.current ? "up" : "down");
    const timer = setTimeout(() => setDirection(null), 400); // Faster reset
    prevPriceRef.current = current;
    return () => clearTimeout(timer);
  }, [price]);

  return (
    <div className="relative flex items-center justify-end h-10 min-w-[140px] px-4 group overflow-hidden">
      <div className="relative z-10 flex items-center gap-3 h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={price}
            initial={{ y: direction === "up" ? 5 : -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction === "up" ? -5 : 5, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center"
          >
            <span
              className={`text-[14px] font-mono font-medium tabular-nums tracking-tight transition-colors duration-200 ${
                direction === "up"
                  ? "text-emerald-400"
                  : direction === "down"
                    ? "text-rose-400"
                    : "text-zinc-100"
              }`}
            >
              {price}
            </span>
          </motion.div>
        </AnimatePresence>

        <motion.div
          animate={{
            scaleY: direction ? 1.2 : 0.4,
            opacity: direction ? 1 : 0.2,
            backgroundColor:
              direction === "up"
                ? "#10b981"
                : direction === "down"
                  ? "#f43f5e"
                  : "#3f3f46",
          }}
          className="w-[1px] h-4 rounded-full"
        />
      </div>

      {/* Falling Trace  */}
      <AnimatePresence>
        {direction && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 0.4, ease: "linear" }}
            className={`absolute right-0 w-[1px] h-full ${
              direction === "up" ? "bg-emerald-400" : "bg-rose-400"
            }`}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

PriceCell.displayName = "PriceCell";
