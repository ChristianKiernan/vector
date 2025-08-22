"use client";

import {
  formatDate,
  formatHours,
  getDarkPriorityColor,
  getDarkStatusColor,
} from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectCard({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="group hover:shadow-3xl relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-slate-900/90 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-gray-600/50 hover:shadow-blue-500/10">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Animated border effect */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />

      <div className="relative p-6">
        {/* Header Section */}
        <div className="mb-5 flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="mb-1 truncate bg-gradient-to-r from-white via-blue-50 to-gray-100 bg-clip-text text-xl font-bold text-white">
              {project.name}
            </h3>
            {project.description && (
              <p className="line-clamp-2 text-sm leading-relaxed text-gray-300">
                {project.description}
              </p>
            )}
          </div>

          <div className="ml-4 flex space-x-2">
            <button
              onClick={() => onEdit(project)}
              className="group/btn relative rounded-xl p-2.5 text-gray-400 transition-all duration-200 hover:scale-110 hover:bg-blue-500/10 hover:text-blue-400 active:scale-95"
              aria-label="Edit project"
            >
              <div className="absolute inset-0 rounded-xl bg-blue-500/20 opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100" />
              <svg
                className="relative z-10 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            <button
              onClick={() => onDelete(project.id)}
              className="group/btn relative rounded-xl p-2.5 text-gray-400 transition-all duration-200 hover:scale-110 hover:bg-red-500/10 hover:text-red-400 active:scale-95"
              aria-label="Delete project"
            >
              <div className="absolute inset-0 rounded-xl bg-red-500/20 opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100" />
              <svg
                className="relative z-10 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Status badges with enhanced styling */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span
              className={`relative inline-flex items-center rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-105 ${getDarkPriorityColor(project.priority)}`}
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-white/10" />
              <span className="relative">Priority: {project.priority}</span>
            </span>

            <span
              className={`relative inline-flex items-center rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-105 ${getDarkStatusColor(project.status)}`}
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-white/10" />
              <span className="relative flex items-center">
                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-current" />
                {project.status}
              </span>
            </span>
          </div>
        </div>

        {/* Enhanced metrics grid */}
        <div className="grid grid-cols-2 gap-4">
          {project.estimatedHours && (
            <MetricCard
              icon="⏱️"
              label="Estimated Time"
              value={formatHours(project.estimatedHours)}
              accent="blue"
            />
          )}

          <MetricCard
            icon="📋"
            label="Tasks"
            value={String(project.tasks?.length ?? 0)}
            accent="purple"
          />

          {project.startDate && (
            <MetricCard
              icon="🚀"
              label="Started"
              value={formatDate(new Date(project.startDate))}
              accent="cyan"
            />
          )}

          {project.endDate && (
            <MetricCard
              icon="🎯"
              label="Due"
              value={formatDate(new Date(project.endDate))}
              accent="orange"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ 
  icon, 
  label, 
  value, 
  accent 
}: { 
  icon: string;
  label: string; 
  value: string;
  accent: 'blue' | 'green' | 'purple' | 'cyan' | 'orange';
}) {
  const accentColors = {
    blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 group-hover:border-blue-400/30',
    green: 'from-green-500/10 to-emerald-600/5 border-green-500/20 group-hover:border-green-400/30',
    purple: 'from-yellow-500/10 to-yellow-600/5 border-yellow-500/20 group-hover:border-yellow-400/30',
    cyan: 'from-cyan-500/10 to-teal-600/5 border-cyan-500/20 group-hover:border-cyan-400/30',
    orange: 'from-orange-500/10 to-amber-600/5 border-orange-500/20 group-hover:border-orange-400/30',
  };

  return (
    <div className={`group relative rounded-xl border bg-gradient-to-br p-3 transition-all duration-200 hover:scale-105 ${accentColors[accent]}`}>
      <div className="flex items-center space-x-2 mb-1">
        <span className="text-sm">{icon}</span>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="font-bold text-white text-sm">
        {value}
      </div>
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}