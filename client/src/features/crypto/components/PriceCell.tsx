import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PriceCellProps {
  price?: string;
}

export const PriceCell = ({ price = "---" }: PriceCellProps) => {
  const prevPriceRef = useRef<number | null>(null);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (price === "---") return;

    const current = parseFloat(price.replace(/[$,]/g, ""));

    if (isNaN(current)) {
      return;
    }

    if (prevPriceRef.current !== null && prevPriceRef.current !== current) {
      const newDirection = current > prevPriceRef.current ? "up" : "down";

      setDirection(newDirection);

      // Clear direction after animation
      const timer = setTimeout(() => {
        setDirection(null);
      }, 800);

      prevPriceRef.current = current;
      return () => clearTimeout(timer);
    } else {
      prevPriceRef.current = current;
    }
  }, [price]);

  return (
    <div className="relative flex justify-end items-center px-3 py-1.5 overflow-hidden group">
      {/* Background Glow Effect */}
      <AnimatePresence>
        {direction && (
          <motion.div
            key={`glow-${direction}`}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className={`absolute inset-0 rounded-md z-0 ${
              direction === "up"
                ? "bg-gradient-to-l from-[#38CA6B]/20 via-[#38CA6B]/5 to-transparent"
                : "bg-gradient-to-l from-rose-500/20 via-rose-500/5 to-transparent"
            }`}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Price Text */}
      <motion.span
        animate={{
          color:
            direction === "up"
              ? "#38CA6B"
              : direction === "down"
                ? "#f43f5e"
                : "#ffffff",
          y: direction === "up" ? -2 : direction === "down" ? 2 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative z-10 text-sm font-bold font-mono tracking-tighter tabular-nums"
      >
        {price}
      </motion.span>

      {/* Side Indicator Bar */}
      <AnimatePresence>
        {direction && (
          <motion.div
            key={`bar-${direction}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "60%", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`absolute right-0 w-[2px] rounded-full z-20 ${
              direction === "up" ? "bg-[#38CA6B]" : "bg-rose-500"
            }`}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
