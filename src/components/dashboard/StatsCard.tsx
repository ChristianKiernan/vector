import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: number;
  color: "blue" | "green" | "yellow" | "purple";
  icon: LucideIcon;
};

export default function StatsCard({ label, value, color, icon: Icon }: Props) {
  const styles = {
    blue: "bg-blue-500/10 text-blue-300",
    green: "bg-emerald-500/10 text-emerald-300",
    yellow: "bg-amber-500/10 text-amber-300",
    purple: "bg-violet-500/10 text-violet-300",
  }[color];

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${styles}`}>
          <Icon className="h-5 w-5 block" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
