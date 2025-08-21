"use client";

import type { Task } from "@/types";
import { TaskItem } from "./TaskItem";

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  title,
}: {
  tasks: Task[];
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
  title?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 shadow-xl backdrop-blur-sm">
      <div className="border-b border-gray-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">{title ?? "Tasks"}</h2>
      </div>

      <div className="divide-y divide-gray-800">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
