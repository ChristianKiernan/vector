"use client";

import type { Task } from "@/types";
import {
  formatDate,
  formatHours,
  getDarkPriorityColor,
  getDarkStatusColor,
} from "@/lib/utils";
import { IconButton } from "../Button";
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";

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
  const toggleStatus = () =>
    onStatusChange(task.id, isCompleted ? "ACTIVE" : "COMPLETED");

  return (
    <div className="px-6 py-4 transition-colors hover:bg-gray-800/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Toggle-style completion control */}
          <IconButton
            label={isCompleted ? "Mark as not completed" : "Mark as completed"}
            variant="ghost"
            role="switch"
            aria-checked={isCompleted}
            onClick={toggleStatus}
            className={`text-gray-400 hover:text-white ${
              isCompleted ? "text-emerald-400 hover:text-emerald-300" : ""
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </IconButton>

          <div className="min-w-0 flex-1">
            <p
              className={`text-sm font-medium ${
                isCompleted ? "text-gray-500 line-through" : "text-white"
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
          <IconButton
            label="Edit task"
            variant="ghost"
            className="text-gray-400 hover:text-blue-400"
            onClick={() => onEdit(task)}
          >
            <Pencil className="h-4 w-4" />
          </IconButton>

          <IconButton
            label="Delete task"
            variant="ghost"
            className="text-gray-400 hover:text-red-400"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

