"use client";

import { useEffect, useState } from "react";
import type { Project, Priority } from "@/types";
import { Button } from "../Button";

type FormShape = {
  name: string;
  description: string;
  estimatedHours: string;
  priority: Priority;
  startDate: string;
  endDate: string;
};

export function ProjectFormModal({
  open,
  onClose,
  onSubmit,
  editingProject,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: FormShape) => Promise<void> | void;
  editingProject?: Project;
}) {
  const [form, setForm] = useState<FormShape>({
    name: "",
    description: "",
    estimatedHours: "",
    priority: "MEDIUM",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (!editingProject) {
      setForm({
        name: "",
        description: "",
        estimatedHours: "",
        priority: "MEDIUM",
        startDate: "",
        endDate: "",
      });
    } else {
      setForm({
        name: editingProject.name,
        description: editingProject.description ?? "",
        estimatedHours: editingProject.estimatedHours?.toString() ?? "",
        priority: editingProject.priority,
        startDate: editingProject.startDate
          ? new Date(editingProject.startDate).toISOString().split("T")[0]
          : "",
        endDate: editingProject.endDate
          ? new Date(editingProject.endDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [editingProject]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">
          {editingProject ? "Edit Project" : "Create New Project"}
        </h2>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await onSubmit(form);
          }}
        >
          {/* name */}
          <Field label="Name *">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter project name"
            />
          </Field>

          {/* description */}
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

          {/* estimatedHours */}
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

          {/* priority */}
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

          {/* dates */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date">
              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </Field>
            <Field label="End Date">
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </Field>
          </div>

          {/* actions */}
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
              {editingProject ? "Update Project" : "Create Project"}
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
