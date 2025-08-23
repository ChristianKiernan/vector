"use client";

import { useMemo, useState } from "react";
import type { Task, Project } from "@/types";
import { useTasks } from "@/components/tasks/useTasks";
import { useProjects } from "@/components/projects/useProjects";
import { TaskFormModal } from "@/components/tasks/TaskFormModal";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { TaskItem } from "@/components/tasks/TaskItem";
import { Button } from "@/components/Button";
import { Plus, ClipboardList } from "lucide-react";

import {
  filterTasks,
  type StatusFilter,
  type TaskDueFilter,
  type PriorityFilter,
} from "@/lib/filters";
import { LoadingScreen } from "@/components/LoadingScreen";
import { TasksInlineFilters } from "@/components/tasks/TasksInlineFilters";
export default function DashboardPage() {
  const { tasks, loading, createTask, updateTask, deleteTask, updateStatus } =
    useTasks();
  const { projects } = useProjects();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all"); // "all" | "active" | "completed"
  const [dueFilter, setDueFilter] = useState<TaskDueFilter>("all"); // "all" | "overdue" | "today" | "week" | "noDueDate"
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all"); // "all" | "LOW" | "MEDIUM" | "HIGH"

  const filteredTasks = useMemo(
    () =>
      filterTasks(tasks, {
        due: dueFilter,
        status: statusFilter,
        priority: priorityFilter,
      }),
    [tasks, dueFilter, statusFilter, priorityFilter],
  );

  const completedCount = filteredTasks.filter(
    (t) => t.status === "COMPLETED",
  ).length;
  const activeCount = filteredTasks.filter(
    (t) => t.status !== "COMPLETED",
  ).length;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardStats
          total={filteredTasks.length}
          completed={completedCount}
          active={activeCount}
          projects={projects.length}
        />

        <div className="overflow-visible rounded-xl border border-gray-800 bg-gray-900/50 shadow-xl backdrop-blur-sm">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Tasks</h2>

            <div className="flex flex-wrap items-center gap-3">
              <TasksInlineFilters
                status={statusFilter}
                setStatus={setStatusFilter}
                due={dueFilter}
                setDue={setDueFilter}
                priority={priorityFilter}
                setPriority={setPriorityFilter}
                className="mr-2 md:mr-4"
              />
              <Button variant="primary" size="sm" onClick={() => setShowTaskForm(true)}>
                <Plus className="h-4 w-4" />
                New Task
              </Button>
            </div>
          </div>

          {/* Content */}
          {filteredTasks.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <ClipboardList
                className="mx-auto block h-12 w-12 text-gray-600"
                aria-hidden="true"
              />
              <h3 className="mt-3 text-sm font-medium text-white">
                No tasks match
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Try changing or clearing filters, or create a new task.
              </p>
              <div className="mt-6">
                <Button variant="primary" onClick={() => setShowTaskForm(true)}>
                  <Plus className="h-4 w-4" />
                  Create Task
                </Button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-800 p-0">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={(t) => {
                    setEditingTask(t);
                    setShowTaskForm(true);
                  }}
                  onDelete={deleteTask}
                  onStatusChange={updateStatus}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Task Modal */}
      {showTaskForm && (
        <TaskFormModal
          open={showTaskForm}
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(undefined);
          }}
          editingTask={editingTask}
          projects={projects as Project[]}
          onSubmit={async (form) => {
            const payload: Partial<Task> = {
              title: form.title,
              description: form.description || undefined,
              estimatedHours: form.estimatedHours
                ? parseFloat(form.estimatedHours)
                : undefined,
              priority: form.priority,
              dueDate: form.dueDate ? new Date(form.dueDate) : undefined,
              projectId: form.projectId || undefined,
            };

            if (editingTask) {
              await updateTask(editingTask.id, payload);
            } else {
              await createTask(payload);
            }

            setShowTaskForm(false);
            setEditingTask(undefined);
          }}
        />
      )}
    </div>
  );
}
