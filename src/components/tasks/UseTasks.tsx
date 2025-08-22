"use client";

import { useState, useEffect, useCallback } from "react";
import type { Task } from "@/types";

type UpsertPayload = Partial<Task>;

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) setTasks(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(async (payload: UpsertPayload) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return;
    const saved = await res.json();
    setTasks((prev) => [saved, ...prev]);
    return saved;
  }, []);

  const updateTask = useCallback(async (id: string, payload: UpsertPayload) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return;
    const saved = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === id ? saved : t)));
    return saved;
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    const ok = confirm("Delete this task?");
    if (!ok) return false;
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) return false;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    return true;
  }, []);

  const updateStatus = useCallback(
    async (id: string, status: Task["status"]) => {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));

      try {
        const res = await fetch(`/api/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        if (!res.ok) throw new Error("Failed to update status");
        const saved = await res.json();
        setTasks((prev) => prev.map((t) => (t.id === id ? saved : t)));
        return saved;
      } catch (e) {
        console.error(e);
        // rollback if failed
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status: t.status === "COMPLETED" ? "TODO" : "COMPLETED",
                }
              : t,
          ),
        );
      }
    },
    [],
  );

  return {
    tasks,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    updateStatus,
  };
}
