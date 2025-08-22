import type { LucideIcon } from "lucide-react";
import { ClipboardList, Sun, CalendarRange, CalendarDays } from "lucide-react";
import type { TaskFilter } from "@/types";

export type EmptyTasksProps = {
  filter: TaskFilter;
};

const ICONS: Record<TaskFilter, LucideIcon> = {
  all: ClipboardList,
  today: Sun,
  week: CalendarRange,
  month: CalendarDays,
};

export function EmptyTasks({ filter }: EmptyTasksProps) {
  const heading =
    filter === "all"
      ? "No tasks"
      : filter === "today"
        ? "No tasks for today"
        : filter === "week"
          ? "No tasks this week"
          : "No tasks this month";

  const subtitle =
    filter === "all"
      ? "Get started by creating a new task."
      : "Nice and clear — add a task to get rolling.";

  const Icon = ICONS[filter];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 shadow-xl backdrop-blur-sm">
      <div className="border-b border-gray-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Tasks</h2>
      </div>
      <div className="px-6 py-12 text-center">
        <Icon
          className="mx-auto block h-12 w-12 text-gray-600"
          aria-hidden="true"
        />
        <h3 className="mt-2 text-sm font-medium text-white">{heading}</h3>
        <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
