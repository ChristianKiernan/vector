"use client";

import { useEffect, useState, useCallback } from "react";
import type { Project, Priority } from "@/types";

// Payload for creating a project 
type CreateProjectPayload = {
  name: string;
  priority: Priority;
  description?: string;
  estimatedHours?: number;
  startDate?: string;
  endDate?: string;
  status?: Project["status"];
};

// Payload for updating a project (partial, including status)
type UpdateProjectPayload = {
  name?: string;
  priority?: Priority;
  description?: string;
  estimatedHours?: number;
  startDate?: string;
  endDate?: string;
  status?: Project["status"];
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

  const createProject = useCallback(async (payload: CreateProjectPayload) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return;
    const saved: Project = await res.json();
    setProjects((prev) => [saved, ...prev]);
    return saved;
  }, []);

  const updateProject = useCallback(
    async (id: string, payload: UpdateProjectPayload) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT", // if your API supports PATCH, you can switch to PATCH here
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return;
      const saved: Project = await res.json();
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

  // Helper 
  const setProjectStatus = useCallback(
    (id: string, status: Project["status"]) => updateProject(id, { status }),
    [updateProject],
  );

  return {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    setProjectStatus, 
  };
}
