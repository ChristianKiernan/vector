"use client";

import type { Task } from "@/types";
import {
  formatDate,
  formatHours,
  getDarkPriorityColor,
  getDarkStatusColor,
} from "@/lib/utils";

export function TaskItem({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  task: Task;
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}) {
  const nextStatusForCheckbox = (checked: boolean): Task["status"] =>
    checked ? "COMPLETED" : "TODO";

  return (
    <div className="px-6 py-4 transition-colors hover:bg-gray-800/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={task.status === "COMPLETED"}
            onChange={(e) =>
              onStatusChange(task.id, nextStatusForCheckbox(e.target.checked))
            }
            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-green-600 focus:ring-green-500"
            aria-label={
              task.status === "COMPLETED"
                ? "Mark as not completed"
                : "Mark as completed"
            }
          />
          <div className="min-w-0 flex-1">
            <p
              className={`text-sm font-medium ${
                task.status === "COMPLETED"
                  ? "text-gray-500 line-through"
                  : "text-white"
              }`}
            >
              {task.title}
            </p>

            {task.description && (
              <p className="mt-1 text-sm text-gray-400">{task.description}</p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDarkPriorityColor(
                  task.priority,
                )}`}
              >
                {task.priority}
              </span>

              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDarkStatusColor(
                  task.status,
                )}`}
              >
                {task.status.replace("_", " ")}
              </span>

              {task.estimatedHours && (
                <span className="text-xs text-gray-400">
                  Est: {formatHours(task.estimatedHours)}
                </span>
              )}

              {task.dueDate && (
                <span className="text-xs text-gray-400">
                  Due: {formatDate(new Date(task.dueDate))}
                </span>
              )}

              {task.project && (
                <span className="rounded border border-blue-800 bg-blue-900/30 px-2 py-1 text-xs text-blue-400">
                  {task.project.name}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-blue-400"
            aria-label="Edit task"
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
            onClick={() => onDelete(task.id)}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-red-400"
            aria-label="Delete task"
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
    </div>
  );
}
