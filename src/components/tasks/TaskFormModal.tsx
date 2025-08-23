"use client";

import { useEffect, useState } from "react";
import type { Task, Project, Priority } from "@/types";
import { Button } from "../Button";

export type TaskFormShape = {
  title: string;
  description: string;
  estimatedHours: string; 
  priority: Priority;
  dueDate: string; 
  projectId: string; 
};

export function TaskFormModal({
  open,
  onClose,
  onSubmit,
  editingTask,
  projects,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormShape) => Promise<void> | void;
  editingTask?: Task;
  projects: Project[];
}) {
  const [form, setForm] = useState<TaskFormShape>({
    title: "",
    description: "",
    estimatedHours: "",
    priority: "MEDIUM",
    dueDate: "",
    projectId: "",
  });

  useEffect(() => {
    if (!editingTask) {
      setForm({
        title: "",
        description: "",
        estimatedHours: "",
        priority: "MEDIUM",
        dueDate: "",
        projectId: "",
      });
    } else {
      setForm({
        title: editingTask.title,
        description: editingTask.description ?? "",
        estimatedHours: editingTask.estimatedHours?.toString() ?? "",
        priority: editingTask.priority,
        dueDate: editingTask.dueDate
          ? new Date(editingTask.dueDate).toISOString().split("T")[0]
          : "",
        projectId: editingTask.projectId ?? "",
      });
    }
  }, [editingTask]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">
          {editingTask ? "Edit Task" : "Create New Task"}
        </h2>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await onSubmit(form); // <- parent maps to Partial<Task>
          }}
        >
          {/* Title */}
          <Field label="Title *">
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter task title"
            />
          </Field>

          {/* Description */}
          <Field label="Description">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Add a description..."
            />
          </Field>

          {/* Estimated Hours */}
          <Field label="Estimated Hours">
            <input
              type="number"
              step="0.5"
              min="0"
              value={form.estimatedHours}
              onChange={(e) =>
                setForm({ ...form, estimatedHours: e.target.value })
              }
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="0.0"
            />
          </Field>

          {/* Priority */}
          <Field label="Priority">
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value as Priority })
              }
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </Field>

          {/* Due Date */}
          <Field label="Due Date">
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </Field>

          {/* Project */}
          <Field label="Project">
            <select
              value={form.projectId}
              onChange={(e) => setForm({ ...form, projectId: e.target.value })}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">No Project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
            >
              {editingTask ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>
      {children}
    </div>
  );
}
