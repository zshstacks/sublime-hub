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
    <div className={`text-xl font-mono font-bold tracking-tighter ${color}`}>
      {value}
    </div>
    <div className="text-[9px] text-white/20 uppercase font-black tracking-widest mt-1">
      {label}
    </div>
  </div>
);
