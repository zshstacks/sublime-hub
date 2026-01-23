"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MarketCapCell = ({ value = "---" }: { value?: string }) => {
  const prevValueRef = useRef<string>(value);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setIsUpdating(true);
      const timer = setTimeout(() => setIsUpdating(false), 600);
      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="relative flex items-center justify-end h-10 min-w-[120px] px-4">
      {/* 1. Subtle Update Flash s */}
      <AnimatePresence>
        {isUpdating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 bg-white"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-end">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ opacity: 0.5, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-[13px] font-mono font-medium text-zinc-400 tabular-nums tracking-tight group-hover:text-zinc-200 transition-colors"
          >
            {value}
          </motion.span>
        </AnimatePresence>

        {/* 2. Micro-indicator  */}
        <motion.div
          animate={{
            opacity: isUpdating ? 1 : 0.3,
            scaleX: isUpdating ? 1 : 0.8,
          }}
          className="h-[1px] w-8 bg-zinc-700 mt-0.5 origin-right"
        />
      </div>

      {/* 3. Falling Trace  */}
      <AnimatePresence>
        {isUpdating && (
          <motion.div
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: "100%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "linear" }}
            className="absolute right-0 w-[1px] h-1/2 z-20 bg-gradient-to-b from-transparent via-zinc-500 to-transparent"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
