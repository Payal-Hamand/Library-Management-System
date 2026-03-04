import { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

const StatsCard = ({ label, value, icon, colorClass, bgClass, borderClass }: StatsCardProps) => (
  <div className={`bg-slate-800 border ${borderClass} rounded-2xl p-5 flex items-center gap-4`}>
    <div className={`w-12 h-12 rounded-xl ${bgClass} flex items-center justify-center flex-shrink-0 ${colorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className={`text-3xl font-bold mt-0.5 ${colorClass}`}>{value}</p>
    </div>
  </div>
);

export default StatsCard;
