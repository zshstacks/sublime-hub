"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

interface PriceChangeCellProps {
  value: number;
}

export const PriceChangeCell = ({ value }: PriceChangeCellProps) => {
  const isPositive = value >= 0;

  const formattedValue = `${isPositive ? "+" : ""}${value.toFixed(2)}%`;

  return (
    <div className="relative flex justify-end items-center h-10 min-w-[100px]">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isPositive
            ? "rgba(56, 202, 107, 0.05)"
            : "rgba(244, 63, 94, 0.05)",
          borderColor: isPositive
            ? "rgba(56, 202, 107, 0.15)"
            : "rgba(244, 63, 94, 0.15)",
        }}
        className="flex items-center gap-1.5 px-3 py-1 rounded-lg border backdrop-blur-sm transition-colors duration-500"
      >
        <motion.span
          key={isPositive ? "up" : "down"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={isPositive ? "text-[#38CA6B]" : "text-rose-500"}
        >
          {isPositive ? (
            <FiTrendingUp
              size={14}
              className="drop-shadow-[0_0_5px_rgba(56,202,107,0.4)]"
            />
          ) : (
            <FiTrendingDown
              size={14}
              className="drop-shadow-[0_0_5px_rgba(244,63,94,0.4)]"
            />
          )}
        </motion.span>

        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: isPositive ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isPositive ? -4 : 4 }}
            transition={{ duration: 0.2 }}
            className={`text-[12px] font-bold font-mono tabular-nums tracking-tighter ${
              isPositive ? "text-[#38CA6B]" : "text-rose-400"
            }`}
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
