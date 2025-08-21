"use client";

import { useState } from "react";
import type { Project, Priority } from "@/types";
import { useProjects } from "@/components/projects/UseProjects";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ProjectsEmpty } from "@/components/projects/ProjectsEmpty";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { ProjectFormModal } from "@/components/projects/ProjectFormModal";
import { LoadingScreen } from "@/components/projects/LoadingScreen";

export default function ProjectsPage() {
  const { projects, loading, createProject, updateProject, deleteProject } =
    useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(
    undefined,
  );

  if (loading) return <LoadingScreen />;

  const handleOpenCreate = () => {
    setEditingProject(undefined);
    setShowForm(true);
  };

  const handleSubmit = async (form: {
    name: string;
    description: string;
    estimatedHours: string;
    priority: Priority;
    startDate: string;
    endDate: string;
  }) => {
    const payload = {
      name: form.name,
      description: form.description || undefined,
      estimatedHours: form.estimatedHours
        ? parseFloat(form.estimatedHours)
        : undefined,
      priority: form.priority,
      startDate: form.startDate || undefined,
      endDate: form.endDate || undefined,
    };

    if (editingProject) {
      await updateProject(editingProject.id, payload);
    } else {
      await createProject(payload);
    }
    setShowForm(false);
    setEditingProject(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProjectsHeader onCreate={handleOpenCreate} />

        {projects.length === 0 ? (
          <ProjectsEmpty />
        ) : (
          <ProjectsGrid
            projects={projects}
            onEdit={(p) => {
              setEditingProject(p);
              setShowForm(true);
            }}
            onDelete={deleteProject}
          />
        )}

        <ProjectFormModal
          open={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingProject(undefined);
          }}
          onSubmit={handleSubmit}
          editingProject={editingProject}
        />
      </div>
    </div>
  );
}
