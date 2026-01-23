"use client";
import { useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

export const PriceChangeCell = memo(({ value }: { value: number }) => {
  const prevValueRef = useRef<number>(value);
  const [trigger, setTrigger] = useState(false);
  const isPositive = value >= 0;
  const formattedValue = `${isPositive ? "+" : ""}${value.toFixed(2)}%`;

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setTrigger(true);
      const timer = setTimeout(() => setTrigger(false), 500);
      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="relative flex justify-end items-center h-10 min-w-[110px] group">
      <motion.div
        animate={{
          backgroundColor: isPositive
            ? "rgba(16, 185, 129, 0.06)"
            : "rgba(244, 63, 94, 0.06)",
          borderColor: isPositive
            ? "rgba(16, 185, 129, 0.2)"
            : "rgba(244, 63, 94, 0.2)",
        }}
        className="relative flex items-center gap-1.5 px-3 py-1 rounded-md border backdrop-blur-md overflow-hidden"
      >
        {/* Falling Trace  */}
        <AnimatePresence>
          {trigger && (
            <motion.div
              key={`trace-change-${value}`}
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "circIn" }}
              className="absolute right-0 top-0 bottom-0 w-[1.5px] z-20"
            >
              <div
                className={`w-full h-full ${
                  isPositive
                    ? "bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
                    : "bg-gradient-to-b from-transparent via-rose-400 to-transparent"
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.span
          animate={{
            color: isPositive ? "#34d399" : "#fb7185",
            scale: trigger ? [1, 1.2, 1] : 1,
          }}
          className="relative z-10 flex items-center"
        >
          {isPositive ? (
            <FiTrendingUp
              size={14}
              className="filter drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]"
            />
          ) : (
            <FiTrendingDown
              size={14}
              className="filter drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]"
            />
          )}
        </motion.span>

        <div className="relative overflow-hidden h-5 flex items-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={value}
              initial={{
                y: value > prevValueRef.current ? 10 : -10,
                opacity: 0,
                filter: "blur(4px)",
              }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{
                y: value > prevValueRef.current ? -10 : 10,
                opacity: 0,
                filter: "blur(4px)",
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.5,
              }}
              className={`text-[12px] font-bold font-mono tabular-nums tracking-tighter relative z-10 ${
                isPositive ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {formattedValue}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
});

PriceChangeCell.displayName = "PriceChangeCell";
