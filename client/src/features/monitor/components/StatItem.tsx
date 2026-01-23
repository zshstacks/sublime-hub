interface StatItemProps {
  label: string;
  value: string | number;
  color?: string;
  align?: string;
}

export const StatItem = ({
  label,
  value,
  color = "text-white/60",
  align = "text-center",
}: StatItemProps) => (
  <div className={align}>
    <div
      className={`text-lg sm:text-xl font-mono font-bold tracking-tighter ${color}`}
    >
      {value}
    </div>
    <div className="text-[8px] sm:text-[9px] text-white/20 uppercase font-black tracking-wider sm:tracking-widest mt-0.5 sm:mt-1">
      {label}
    </div>
  </div>
);
