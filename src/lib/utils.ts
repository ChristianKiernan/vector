import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatHours(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}m`;
  }
  return `${hours.toFixed(1)}h`;
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "URGENT":
      return "text-red-600 bg-red-100";
    case "HIGH":
      return "text-orange-600 bg-orange-100";
    case "MEDIUM":
      return "text-yellow-600 bg-yellow-100";
    case "LOW":
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "COMPLETED":
      return "text-green-600 bg-green-100";
    case "IN_PROGRESS":
      return "text-blue-600 bg-blue-100";
    case "TODO":
      return "text-gray-600 bg-gray-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export function getDarkPriorityColor(priority: string): string {
  switch (priority) {
    case "URGENT":
      return "text-red-400 bg-red-900/30 border border-red-800";
    case "HIGH":
      return "text-orange-400 bg-orange-900/30 border border-orange-800";
    case "MEDIUM":
      return "text-yellow-400 bg-yellow-900/30 border border-yellow-800";
    case "LOW":
      return "text-purple-400 bg-purple-900/30 border border-purple-800";
    default:
      return "text-gray-400 bg-gray-800/50 border border-gray-700";
  }
}

export function getDarkStatusColor(status: string): string {
  switch (status) {
    case "COMPLETED":
      return "text-green-400 bg-green-900/30 border border-green-800";
    case "ACTIVE":
      return "text-blue-400 bg-blue-900/30 border border-blue-800";
    case "ARCHIVED":
      return "text-gray-400 bg-gray-800/50 border border-gray-700";
    default:
      return "text-gray-400 bg-gray-800/50 border border-gray-700";
  }
}
