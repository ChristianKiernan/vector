"use client";

import {
  formatDate,
  formatHours,
  getDarkPriorityColor,
  getDarkStatusColor,
} from "@/lib/utils";
import type { Project } from "@/types";
import { IconButton } from "@/components/Button";
import {
  Pencil,
  Trash2,
  Clock,
  ListChecks,
  Rocket,
  CalendarDays,
  Archive,
  ArchiveRestore,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProjectCardProps = {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Project["status"]) => void;
};

export function ProjectCard({
  project,
  onEdit,
  onDelete,
  onStatusChange,
}: ProjectCardProps) {
  const isArchived = project.status === "ARCHIVED";

  return (
    <div
      className={`h-full rounded-xl border border-gray-800 bg-gray-900/50 p-4 shadow-xl backdrop-blur-sm transition-transform duration-200 hover:scale-[1.01] sm:p-5 lg:p-6 ${
        isArchived ? "opacity-90" : ""
      }`}
    >
      {/* Header row (stacks on small screens) */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-lg font-semibold text-white line-clamp-2 sm:text-xl">
            {project.name}
          </h3>
          {project.description && (
            <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-gray-400 sm:line-clamp-2">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Archive / Restore */}
          <IconButton
            label={isArchived ? "Restore project" : "Archive project"}
            variant="ghost"
            className="text-gray-400 hover:text-amber-400"
            onClick={() =>
              onStatusChange(project.id, isArchived ? "ACTIVE" : "ARCHIVED")
            }
            title={isArchived ? "Restore project" : "Archive project"}
          >
            {isArchived ? (
              <ArchiveRestore className="h-4 w-4" />
            ) : (
              <Archive className="h-4 w-4" />
            )}
          </IconButton>

          <IconButton
            label="Edit project"
            variant="ghost"
            className="text-gray-400 hover:text-blue-400"
            onClick={() => onEdit(project)}
            title="Edit project"
          >
            <Pencil className="h-4 w-4" />
          </IconButton>

          <IconButton
            label="Delete project"
            variant="ghost"
            className="text-gray-400 hover:text-red-400"
            onClick={() => onDelete(project.id)}
            title="Delete project"
          >
            <Trash2 className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      {/* Badges (wrap neatly) */}
      <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:text-xs ${getDarkPriorityColor(
            project.priority,
          )}`}
        >
          Priority: {project.priority}
        </span>

        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:text-xs ${getDarkStatusColor(
            project.status,
          )}`}
        >
          {project.status}
        </span>
      </div>

      {/* Metrics (1 col on mobile → 2 cols on sm+) */}
      <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {project.estimatedHours && (
          <MetricItem
            icon={Clock}
            label="Estimated"
            value={formatHours(project.estimatedHours)}
            tint="blue"
          />
        )}

        <MetricItem
          icon={ListChecks}
          label="Tasks"
          value={String(project.tasks?.length ?? 0)}
          tint="purple"
        />

        {project.startDate && (
          <MetricItem
            icon={Rocket}
            label="Started"
            value={formatDate(new Date(project.startDate))}
            tint="cyan"
          />
        )}

        {project.endDate && (
          <MetricItem
            icon={CalendarDays}
            label="Due"
            value={formatDate(new Date(project.endDate))}
            tint="orange"
          />
        )}
      </div>
    </div>
  );
}

/* ---------------- MetricItem ---------------- */
type MetricTint = "blue" | "green" | "purple" | "cyan" | "orange";

const tintStyles: Record<MetricTint, string> = {
  blue: "bg-blue-500/10 text-blue-300",
  green: "bg-emerald-500/10 text-emerald-300",
  purple: "bg-violet-500/10 text-violet-300",
  cyan: "bg-cyan-500/10 text-cyan-300",
  orange: "bg-amber-500/10 text-amber-300",
};

function MetricItem({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tint: MetricTint;
}) {
  return (
    <div className="flex h-full items-center justify-between rounded-lg border border-gray-800 p-3 sm:block">
      <div className="flex items-center gap-2 sm:mb-1">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-md sm:h-8 sm:w-8 ${tintStyles[tint]}`}
        >
          <Icon className="block h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
          {label}
        </span>
      </div>
      <div className="text-sm font-semibold text-white sm:text-base">{value}</div>
    </div>
  );
}
