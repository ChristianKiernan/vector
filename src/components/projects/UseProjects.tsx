"use client";

import { useEffect, useState, useCallback } from "react";
import type { Project, Priority } from "@/types";

type UpsertPayload = {
  name: string;
  description?: string;
  estimatedHours?: number;
  priority: Priority;
  startDate?: string;
  endDate?: string;
};

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) setProjects(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = useCallback(async (payload: UpsertPayload) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return;
    const saved = await res.json();
    setProjects((prev) => [saved, ...prev]);
    return saved;
  }, []);

  const updateProject = useCallback(
    async (id: string, payload: UpsertPayload) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return;
      const saved = await res.json();
      setProjects((prev) => prev.map((p) => (p.id === id ? saved : p)));
      return saved;
    },
    [],
  );

  const deleteProject = useCallback(async (id: string) => {
    const ok = confirm(
      "Delete this project? Associated tasks will also be deleted.",
    );
    if (!ok) return false;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) return false;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    return true;
  }, []);

  return {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}
