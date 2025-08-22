"use client";

import { useState, useMemo } from "react";
import type { Task, Project } from "@/types";
import { TaskFormModal } from "@/components/tasks/TaskFormModal";
import { useTasks } from "@/components/tasks/UseTasks";
import { useProjects } from "@/components/projects/UseProjects";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { TaskControls } from "@/components/dashboard/TaskControls";
import { TaskList } from "@/components/dashboard/TaskList";
import { EmptyTasks } from "@/components/dashboard/EmptyTasks";
import { LoadingScreen } from "@/components/projects/LoadingScreen";

type Filter = "all" | "today" | "week" | "month";

export default function Dashboard() {
  const { tasks, loading, createTask, updateTask, deleteTask, updateStatus } =
    useTasks();
  const { projects } = useProjects();
  const [filter, setFilter] = useState<Filter>("all");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // Always call hooks before branching
  const { filteredTasks, completedCount, activeCount } = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(
      today.getTime() - today.getDay() * 24 * 60 * 60 * 1000,
    );
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const withinFilter = (task: Task) => {
      const taskDate = task.dueDate
        ? new Date(task.dueDate)
        : task.createdAt
          ? new Date(task.createdAt)
          : null;

      if (!taskDate) return filter === "all";

      switch (filter) {
        case "today":
          return (
            taskDate >= today &&
            taskDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
          );
        case "week":
          return taskDate >= weekStart;
        case "month":
          return taskDate >= monthStart;
        default:
          return true;
      }
    };

    const ft = tasks.filter(withinFilter);
    const completed = ft.filter((t) => t.status === "COMPLETED").length;
    const active = ft.filter((t) => t.status !== "COMPLETED").length;

    return {
      filteredTasks: ft,
      completedCount: completed,
      activeCount: active,
    };
  }, [tasks, filter]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />

        <DashboardStats
          total={filteredTasks.length}
          completed={completedCount}
          active={activeCount}
          projects={projects.length}
        />

        <TaskControls
          filter={filter}
          setFilter={setFilter}
          onNewTask={() => setShowTaskForm(true)}
        />

        {filteredTasks.length === 0 ? (
          <EmptyTasks filter={filter} />
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={(t) => {
              setEditingTask(t);
              setShowTaskForm(true);
            }}
            onDelete={deleteTask}
            onStatusChange={updateStatus}
            title={
              filter === "all"
                ? "All Tasks"
                : filter === "today"
                  ? "Today's Tasks"
                  : filter === "week"
                    ? "This Week's Tasks"
                    : "This Month's Tasks"
            }
          />
        )}
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
            // Map form (strings) -> API payload (typed)
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
