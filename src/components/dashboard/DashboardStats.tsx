import StatsCard from "@/components/dashboard/StatsCard";
import type { LucideIcon } from "lucide-react";
import { ListChecks, CheckCircle2, Clock, FolderKanban } from "lucide-react";

type DashboardStatsProps = {
  total: number;
  completed: number;
  active: number;
  projects: number;
};

type Card = {
  label: string;
  value: number;
  color: "blue" | "green" | "yellow" | "purple";
  icon: LucideIcon;
};

export function DashboardStats({
  total,
  completed,
  active,
  projects,
}: DashboardStatsProps) {
  const cards: Card[] = [
    { label: "Total Tasks", value: total, color: "blue", icon: ListChecks },
    { label: "Completed", value: completed, color: "green", icon: CheckCircle2 },
    { label: "In Progress", value: active, color: "yellow", icon: Clock },
    { label: "Projects", value: projects, color: "purple", icon: FolderKanban },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <StatsCard
          key={c.label}
          label={c.label}
          value={c.value}
          color={c.color}
          icon={c.icon}
        />
      ))}
    </div>
  );
}
