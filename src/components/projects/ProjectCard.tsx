"use client";

import {
  formatDate,
  formatHours,
  getDarkPriorityColor,
  getDarkStatusColor,
} from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectCard({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 shadow-xl backdrop-blur-sm transition-all duration-200 hover:border-gray-700 hover:shadow-2xl">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="truncate text-lg font-semibold text-white">
            {project.name}
          </h3>
          <div className="flex space-x-1">
            <button
              onClick={() => onEdit(project)}
              className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-blue-400"
              aria-label="Edit project"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-red-400"
              aria-label="Delete project"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {project.description && (
          <p className="mb-4 text-sm text-gray-400">{project.description}</p>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDarkPriorityColor(project.priority)}`}
            >
              {project.priority}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDarkStatusColor(project.status)}`}
            >
              {project.status}
            </span>
          </div>

          {project.estimatedHours && (
            <Row
              label="Estimated"
              value={formatHours(project.estimatedHours)}
            />
          )}
          <Row label="Actual" value={formatHours(project.actualHours)} />
          <Row label="Tasks" value={String(project.tasks?.length ?? 0)} />

          {project.startDate && (
            <Row
              label="Started"
              value={formatDate(new Date(project.startDate))}
            />
          )}
          {project.endDate && (
            <Row label="Due" value={formatDate(new Date(project.endDate))} />
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-400">{label}:</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
