"use client";

import { useMemo, useState } from "react";
import type { Project, Priority } from "@/types";
import { useProjects } from "@/components/projects/useProjects";
import { ProjectFormModal } from "@/components/projects/ProjectFormModal";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/Button";
import { Plus, FolderPlus } from "lucide-react";

import {
  filterProjects,
  type StatusFilter,
  type ProjectDueFilter,
  type PriorityFilter,
} from "@/lib/filters";
import { ProjectsInlineFilters } from "@/components/projects/ProjectInlineFilters";

export default function ProjectsPage() {
  const { projects, loading, createProject, updateProject, deleteProject } =
    useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(
    undefined,
  );

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dueFilter, setDueFilter] = useState<ProjectDueFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  const filtered = useMemo(
    () =>
      filterProjects(projects, {
        status: statusFilter,
        due: dueFilter,
        priority: priorityFilter,
      }),
    [projects, statusFilter, dueFilter, priorityFilter],
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
    if (editingProject) await updateProject(editingProject.id, payload);
    else await createProject(payload);
    setShowForm(false);
    setEditingProject(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Panel wrapper */}
        <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 shadow-xl backdrop-blur-sm">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Projects</h2>

            <div className="flex flex-wrap items-center gap-3">
              <ProjectsInlineFilters
                status={statusFilter}
                setStatus={setStatusFilter}
                due={dueFilter}
                setDue={setDueFilter}
                priority={priorityFilter}
                setPriority={setPriorityFilter}
                className="mr-2 md:mr-4"
              />
              <Button variant="primary" size="sm" onClick={handleOpenCreate}>
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>

          {/* Content */}
          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <FolderPlus
                className="mx-auto block h-12 w-12 text-gray-600"
                aria-hidden="true"
              />
              <h3 className="mt-3 text-sm font-medium text-white">
                No projects match
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Try changing or clearing filters, or create a new project.
              </p>
              <div className="mt-6">
                <Button variant="primary" onClick={handleOpenCreate}>
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={(p) => {
                    setEditingProject(p);
                    setShowForm(true);
                  }}
                  onDelete={deleteProject}
                  onStatusChange={(id, status) => updateProject(id, { status })}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
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
