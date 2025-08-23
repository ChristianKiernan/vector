"use client";

import type { Task } from "@/types";
import {
  formatDate,
  formatHours,
  getDarkPriorityColor,
  getDarkStatusColor,
  cn, // assuming you export cn from "@/lib/utils"
} from "@/lib/utils";
import { IconButton } from "../Button";
import {
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
  Archive,
  ArchiveRestore,
} from "lucide-react";

export type TaskItemProps = {
  task: Task;
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
};

export function TaskItem({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskItemProps) {
  const isCompleted = task.status === "COMPLETED";
  const isArchived = task.status === "ARCHIVED";

  const toggleCompletion = () => {
    if (isArchived) return; // archived tasks cannot be toggled complete
    onStatusChange(task.id, isCompleted ? "ACTIVE" : "COMPLETED");
  };

  const toggleArchive = () => {
    onStatusChange(task.id, isArchived ? "ACTIVE" : "ARCHIVED");
  };

  return (
    <div className="px-6 py-4 transition-colors hover:bg-gray-800/30">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Completion toggle (disabled when archived) */}
          <IconButton
            label={
              isArchived
                ? "Task is archived"
                : isCompleted
                  ? "Mark as not completed"
                  : "Mark as completed"
            }
            variant="ghost"
            role="switch"
            aria-checked={isCompleted}
            aria-disabled={isArchived}
            disabled={isArchived}
            onClick={toggleCompletion}
            className={cn(
              "text-gray-400 hover:text-white",
              isCompleted && "text-emerald-400 hover:text-emerald-300",
              isArchived && "cursor-not-allowed opacity-60 hover:text-gray-400",
            )}
            title={
              isArchived
                ? "Archived tasks cannot be completed"
                : isCompleted
                  ? "Mark as not completed"
                  : "Mark as completed"
            }
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Circle className="h-5 w-5" aria-hidden="true" />
            )}
          </IconButton>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-sm font-medium",
                isCompleted
                  ? "text-gray-500 line-through"
                  : isArchived
                    ? "text-gray-400"
                    : "text-white",
              )}
            >
              {task.title}
            </p>

            {task.description && (
              <p className="mt-1 truncate text-sm text-gray-400">
                {task.description}
              </p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                  getDarkPriorityColor(task.priority),
                )}
              >
                Priority: {task.priority}
              </span>

              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                  getDarkStatusColor(task.status),
                )}
              >
                {task.status.replace("_", " ")}
              </span>

              {task.estimatedHours && (
                <span className="text-xs text-gray-400">
                  Estimated time: {formatHours(task.estimatedHours)}
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

        {/* Actions */}
        <div className="flex items-center gap-2">
          <IconButton
            label={isArchived ? "Restore task" : "Archive task"}
            variant="ghost"
            className="text-gray-400 hover:text-amber-400"
            onClick={toggleArchive}
            title={isArchived ? "Restore task" : "Archive task"}
          >
            {isArchived ? (
              <ArchiveRestore className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Archive className="h-4 w-4" aria-hidden="true" />
            )}
          </IconButton>

          <IconButton
            label="Edit task"
            variant="ghost"
            className="text-gray-400 hover:text-blue-400"
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </IconButton>

          <IconButton
            label="Delete task"
            variant="ghost"
            className="text-gray-400 hover:text-red-400"
            onClick={() => onDelete(task.id)}
            title="Delete task"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
