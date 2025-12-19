interface StatItemProps {
  label: string;
  value: string | number;
  color?: string;
  align?: string;
}

export const StatItem = ({
  label,
  value,
  color = "text-white",
  align = "text-center",
}: StatItemProps) => (
  <div className={align}>
    <div className={`text-lg font-bold ${color}`}>{value}</div>
    <div className="text-[10px] text-white/20 uppercase font-bold tracking-tight mt-0.5">
      {label}
    </div>
  </div>
);
