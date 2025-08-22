// "use client";

// import { useState } from "react";
// import { Task, Project, Priority } from "@/types";

// interface TaskFormProps {
//   task?: Task;
//   projects: Project[];
//   onSubmit: (taskData: Partial<Task>) => void;
//   onCancel: () => void;
// }

// export default function TaskForm({
//   task,
//   projects,
//   onSubmit,
//   onCancel,
// }: TaskFormProps) {
//   const [formData, setFormData] = useState({
//     title: task?.title || "",
//     description: task?.description || "",
//     estimatedHours: task?.estimatedHours?.toString() || "",
//     priority: task?.priority || ("MEDIUM" as Priority),
//     dueDate: task?.dueDate
//       ? new Date(task.dueDate).toISOString().split("T")[0]
//       : "",
//     projectId: task?.projectId || "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({
//       title: formData.title,
//       description: formData.description || undefined,
//       estimatedHours: formData.estimatedHours
//         ? parseFloat(formData.estimatedHours)
//         : undefined,
//       priority: formData.priority,
//       dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
//       projectId: formData.projectId || undefined,
//     });
//   };

//   return (
//     <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
//       <div className="w-full max-w-md rounded-lg bg-white p-6">
//         <h2 className="mb-4 text-xl font-semibold">
//           {task ? "Edit Task" : "Create New Task"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="title"
//               className="mb-1 block text-sm font-medium text-gray-700"
//             >
//               Title *
//             </label>
//             <input
//               id="title"
//               type="text"
//               required
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="description"
//               className="mb-1 block text-sm font-medium text-gray-700"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               rows={3}
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="estimatedHours"
//               className="mb-1 block text-sm font-medium text-gray-700"
//             >
//               Estimated Hours
//             </label>
//             <input
//               id="estimatedHours"
//               type="number"
//               step="0.5"
//               min="0"
//               value={formData.estimatedHours}
//               onChange={(e) =>
//                 setFormData({ ...formData, estimatedHours: e.target.value })
//               }
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="priority"
//               className="mb-1 block text-sm font-medium text-gray-700"
//             >
//               Priority
//             </label>
//             <select
//               id="priority"
//               value={formData.priority}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   priority: e.target.value as Priority,
//                 })
//               }
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             >
//               <option value="LOW">Low</option>
//               <option value="MEDIUM">Medium</option>
//               <option value="HIGH">High</option>
//               <option value="URGENT">Urgent</option>
//             </select>
//           </div>

//           <div>
//             <label
//               htmlFor="dueDate"
//               className="mb-1 block text-sm font-medium text-gray-700"
//             >
//               Due Date
//             </label>
//             <input
//               id="dueDate"
//               type="date"
//               value={formData.dueDate}
//               onChange={(e) =>
//                 setFormData({ ...formData, dueDate: e.target.value })
//               }
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="projectId"
//               className="mb-1 block text-sm font-medium text-gray-700"
//             >
//               Project
//             </label>
//             <select
//               id="projectId"
//               value={formData.projectId}
//               onChange={(e) =>
//                 setFormData({ ...formData, projectId: e.target.value })
//               }
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             >
//               <option value="">No Project</option>
//               {projects.map((project) => (
//                 <option key={project.id} value={project.id}>
//                   {project.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
//             >
//               {task ? "Update Task" : "Create Task"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import type { Task, Project, Priority } from "@/types";

export type TaskFormShape = {
  title: string;
  description: string;
  estimatedHours: string; // string like "1.5" (parent converts to number)
  priority: Priority;
  dueDate: string; // "YYYY-MM-DD" (parent converts to Date)
  projectId: string; // "" means no project (parent converts to undefined)
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
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700"
            >
              {editingTask ? "Update Task" : "Create Task"}
            </button>
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
